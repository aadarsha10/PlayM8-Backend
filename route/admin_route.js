const express = require('express')
const router = express.Router()
const admin = require('../models/admin_details_model')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/createAdmin', [


    check('Fullname', 'Firstname is required').not().isEmpty(),
    check('Address', 'Address is required').not().isEmpty(),
    check('Contact', 'Contact must be valid').isMobilePhone(),
    check('Username', 'Username is required').not().isEmpty(),
    check('Email', 'Email is required').not().isEmpty(),//check for empty email field
    check('Email', 'Enter correct Email').isEmail(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Password', 'Enter Strong password').isStrongPassword()



], function (req, res) {

    //    if(req.body == undefined)
    // {
    //     return res.status(400).json({message: "Invalid file format"})
    // }
    const validationError = validationResult(req);

    if (validationError.isEmpty()) {
        const Fullname = req.body.Fullname
        const Address = req.body.Address
        const Contact = req.body.Contact
        const Username = req.body.Username
        const Email = req.body.Email
        const Password = req.body.Password

        bcryptjs.hash(Password, 10, function (err, hash) {

            const admin_details = new admin({
                Fullname: Fullname,
                Address: Address,
                Contact: Contact,
                Username: Username,
                Email: Email,
                Password: hash
            });

            console.log("details:", admin_details)

        admin_details.save().then(function (result) {
            res.json({
                message: " Admin Registered Succesfully!"
            
        
        })
    }).catch(function (err) {
            res.status(500).json(err)
        });
    });
    }
    else {
        const error = validationError.errors[0].msg
        res.send({ error: error })
        //error validation for every details of organizer
    }
})


router.post('/login/admin', function(req,res){
    const userName=req.body.userName
    const password=req.body.password   //user provided password
    //we need to find if user exists

    console.log("userName", userName)
    console.log("password", password)
    admin.findOne({Username:userName})    //first ko userName user_model bata aako sec ko variable
    .then(function(adminData){
        if(adminData===null){
            return res.status(403).json({message : "Invalid username or password!"})
        }

        console.log("adminData", adminData)
        //username is correct
        bcryptjs.compare(password, adminData.Password, function(err, result)
       { 
            console.log("result", result)//first password is variable and another is db password
            if(result===false){
                return res.status(403).json({message : "Invalid Username or Passworddddd"})
            }
           
            const token=jwt.sign({adminId:adminData._id},'secretkey')  //providing token
            res.status(200).json({
                message:"Authorization success",
                token:token,
                adminID : adminData._id,
                username : adminData.Username,
                fullname : adminData.Fullname,
                Email : adminData.Email,
                Contact : adminData.Contact
            })
        
        })
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })  
})


module.exports = router