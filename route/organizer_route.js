const express = require('express')
const router = express.Router()
const organizer = require('../models/organizer_detail_model')
const { check, validationResult } = require('express-validator')


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


module.exports = router