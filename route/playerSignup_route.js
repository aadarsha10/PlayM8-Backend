const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') //for validation npm i express-validator --save
const bcryptjs = require('bcryptjs')   //for encryption, done after validation
const jwt = require('jsonwebtoken')
const player = require('../models/playerSignup_model')   //for token npm i jsonwebtoken --save

router.post('/register/player', function (req, res) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {        //if there is no error
        const firstName = req.body.fname
        const lastName = req.body.lname
        const userName = req.body.username
        const email = req.body.email
        const password = req.body.password
        console.log(firstName)


        bcryptjs.hash(password, 10, function (err, hash) {   //hash varifies that a file/data hasnot altered.
            const players = new player({ firstName: firstName, lastName: lastName, userName: userName, email: email, password: hash }) //first ko userName vnya database ko second ko chei mathi variable
            console.log(players)

            players.save()
                .then(function () {
                    res.status(201).json({ success: true, message: "Registered!" })    //showing message in postman/client
                })
                .catch(function () {
                    res.status(500).json({ success: false, message: err })
                })
        })

    }
    else {
        res.status(400).json(errors.array())   //if there is error send errors
    }

})

//login system
router.post('/login/player', function (req, res) {
    const userName = req.body.username
    const password = req.body.password   //user provided password
    //we need to find if user exists
    player.findOne({ userName: userName })    //first variable userName is from user_model while the second is created here
        .then(function (playerData) {
            if (playerData === null) {
                return res.status(403).json({ success: false, playerData: null })
            }
            //username is correct
            bcryptjs.compare(password, playerData.password, function (err, result) { //first password is variable and another is db password
                if (result === false) {
                    return res.status(403).json({ success: false, message: "Invalid username or password!" })
                }
                // res.send("Correct")
                const token = jwt.sign({ playerId: playerData._id }, 'secretkey')  //providing token
                res.status(200).json({
                    success: true,
                    token: token,
                    Username: playerData.userName,
                    Email: playerData.email,
                    Lastname: playerData.lastName,
                    Firstname: playerData.firstName
                })

            })
        })
        .catch(function (err) {
            res.status(500).json({ message: err })
        })
})
module.exports = router