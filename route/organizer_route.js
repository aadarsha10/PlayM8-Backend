const express = require('express')
const router = express.Router()
const organizer = require('../models/organizer_detail_model')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')   //for encryption, done after validation(npm i bcrypt)
const jwt = require('jsonwebtoken')   //for token npm i jsonwebtoken --save

router.post('/createOrganizer', [


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
        const org_details = new organizer({
            Fullname: Fullname,
            Address: Address,
            Contact: Contact,
            Username: Username,
            Email: Email,
            Password: Password
        })
        console.log("details:", org_details)
        org_details.save().then(function (result) {
            res.json({
                message: "Registered Succesfully!"
            })

        }).catch(function (err) {
            res.status(500).json(err)
        })
    }
    else {
        const error = validationError.errors[0].msg
        res.send({ error: error })
        //error validation for every details of organizer
    }
})

//login system
router.post('/login/organizer', function (req, res) {
    const userName = req.body.username
    const password = req.body.password   //user provided password
    //we need to find if user exists
    user.findOne({ userName: userName })    //first variable userName is from user_model while the second is created here
        .then(function (userData) {
            if (userData === null) {
                return res.status(403).json({ success: false, userData: null })
            }
            //username is correct
            bcryptjs.compare(password, userData.password, function (err, result) { //first password is variable and another is db password
                if (result === false) {
                    return res.status(403).json({ success: false, message: "Invalid username or password!" })
                }
                // res.send("Correct")
                const token = jwt.sign({ userId: userData._id }, 'secretkey')  //providing token
                res.status(200).json({
                    success: true,
                    token: token,
                    Username: userData.userName,
                    Email: userData.email,
                    Lastname: userData.lastName,
                    Firstname: userData.firstName
                })


            })
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})


module.exports = router