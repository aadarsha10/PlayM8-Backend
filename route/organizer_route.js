const express = require('express')
const router = express.Router()
const organizer = require('../models/organizer_detail_model')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/organizer/register', [
    check('Fullname', 'Firstname is required').not().isEmpty(),
    check('Address', 'Address is required').not().isEmpty(),
    check('Contact', 'Contact must be valid').isMobilePhone(),
    check('Username', 'Username is required').not().isEmpty(),
    check('Email', 'Email is required').not().isEmpty(),//check for empty email field
    check('Email', 'Enter correct Email').isEmail(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Password', 'Enter Strong password').isStrongPassword()
], function (req, res) {
    const validationError = validationResult(req);

    if (validationError.isEmpty()) {
        const Fullname = req.body.Fullname
        const Address = req.body.Address
        const Contact = req.body.Contact
        const Username = req.body.Username
        const Email = req.body.Email
        const Password = req.body.Password
        bcryptjs.hash(Password, 10, function (err, hash) {
            const org_details = new organizer({
                Fullname: Fullname,
                Address: Address,
                Contact: Contact,
                Username: Username,
                Email: Email,
                Password: hash
            })
            console.log("details:", org_details)
            org_details.save().then(function (result) {
                res.json({
                    message: "Registered"
                })
            }).catch(function (err) {
                res.status(500).json(err)
            })
        })
    }
    else {
        const error = validationError.errors[0].msg
        console.log("error", error)
        res.json({message : error })
        
    }
})

router.post('/organizer/login', function (req, res) {
    const userName = req.body.userName
    const password = req.body.password   //user provided password
    //we need to find if user exists

    console.log("userName", userName)
    console.log("password", password)
    organizer.findOne({ Username: userName })    //first ko userName user_model bata aako sec ko variable
        .then(function (organizerData) {
            if (organizerData === null) {
                return res.status(403).json({ message: "Invalid username or password!" })
            }

            console.log("organizerData", organizerData)
            //username is correct
            bcryptjs.compare(password, organizerData.Password, function (err, result) {
                console.log("result", result)//first password is variable and another is db password
                if (result === false) {
                    return res.status(403).json({ message: "Invalid Username or Passworddddd" })
                }
                else {
                    res.status(200).json({
                        message: "logged in Succesfully!"
                    })
                }
                res.send("Correct")
                const token = jwt.sign({ customerId: customerData._id }, 'secretkey')  //providing token
                res.status(200).json({
                    message: "Authorization success",
                    token: token,
                    customerID: customerData._id,
                    username: customerData.userName,
                    customerName: customerData.fullName,
                    customerEmail: customerData.email,
                    customerPhone: customerData.phoneNumber
                })



            })
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})


module.exports = router