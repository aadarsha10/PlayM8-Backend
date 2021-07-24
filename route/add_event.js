const express = require('express')
const router = express.Router()



router.post('/organizer/addEvent', function (req, res) {

    const GameTitle = req.body.GameTitle
    const GameType = req.body.GameType
    const Image = req.body.Image
    const Description = req.body.Description

    const eventDetail = new events({

        GameTitle: GameTitle,
        GameType:GameType,
        Image: Image,
        Description: Description
    })

    eventDetail.save().then(function () {
        res.status(201).json({
            success: true,
            message: "success"
        })
    })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})

module.exports = router