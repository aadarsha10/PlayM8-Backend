const express = require('express')
const router = express.Router()
const playerSignup_model = require('../Model/playerSignup_model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')



router.post('/register', function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email
    const contact = req.body.contact

    console.log(playerSignup_model)

    const me = new playerSignup_model({
        firstName : firstName,
        lastName  : lastName,
        userName  : userName,
        password  : password,
        email : email,
        contact : contact
    })
    me.save().then(function(result){
        res.status(200).json({message:"success"})
    }).catch(function(err){
        res.status(500).json({message:err})
    })
})

router.post('/login', function(req, res){
    const userName = req.body.userName
    const passWord = req.body.password

    console.log("username",userName)
    console.log("password",passWord)

    playerSignup_model.findOne({userName: userName})
    .then(function(playerData){
        if(playerData === null){
            return res.status(400).json({
                message : "Invalid Password!!!"
            })
        }
        console.log("PlayerData", playerData, playerData.password)
        
            bcryptjs.compare(passWord, playerData.password, function(err,result){ //first password is variable and another is db password
                if(result===false){
                    return res.status(403).json({success:false, message : "Invalid username or password!"})
                }
                // res.send("Correct")
                const token=jwt.sign({userId:playerData._id},'secretkey')  //providing token
                res.status(200).json({
                    //success:true,
                    message : "Authorization Success",
                    token:token,
                    firstName : playerData.firstName,
                    email : playerData.email,
                    contact : playerData.contact,
                    userName : playerData.userName
                })
            
            })
        })
        .catch(function(err){
        res.status(500).json({message : err});  
    })
})

module.exports = router