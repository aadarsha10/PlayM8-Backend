const express = require('express')
const router = express.Router()
const Player = require('..Model/playerSignup_model')


router.post('/register', function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email
    const contact = req.body.contact

    console.log(Player)

    const me = new Player({
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
    const password = req.body.password

    console.log("username", password)

    Player.findOne({userName: userName})
    .then(function(playerData){
        if(playerData === null){
            return res.status(400).json({
                message : "Invalid Password!!!"
            })
        }
        console.log("PlayerData", playerData.password)
        
        bcryptjs.compare(password, playerData.password, function(err, result){
            if(result === false){
                return res.status(400).json({message : "Invalid username or password"})
            }

            const token = jwt.sign({player_id : playerData._id}, 'secretkey')
            res.status(200).json({
                message : "Authorization Success",
                token : token,
                firstName : playerData.firstName,
                email : playerData.email,
                contact : playerData.contact,
                userName : playerData.userName,
            })
        })
    }).catch(function(err){
        res.status(500).json({message : err});
})
})
