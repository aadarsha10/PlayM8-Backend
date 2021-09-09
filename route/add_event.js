const express = require('express')
const router = express.Router()
const events = require('../models/add_event_model')
const upload = require('../middleware/upload')



router.post('/organizer/addEvent', upload.single('image'), function (req, res) {

    console.log(req.body);

    if (req.file == undefined) {
        console.log("file aayo????", req.file)
        return res.status(400).json({
            message: "Invalid file format"
        })
    }

    const GameTitle = req.body.GameTitle
    const GameType = req.body.GameType
    const image = req.file.filename
    const GameDate = req.body.Date
    const Prize = req.body.Prize
    const Venue = req.body.Venue
    const Description = req.body.Description
    const Username = req.body.Username

    const eventDetail = new events({

        GameTitle: GameTitle,
        GameType: GameType,
        Image: image,
        GameDate: GameDate,
        Prize: Prize,
        Venue: Venue,
        Description: Description,
        Username: Username
    })

    console.log("event", eventDetail)

    eventDetail.save().then(function () {
        // res.send(image)
        res.status(201).json({
            success: true,
            message: "success"
        })
    })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})

router.get("/getAddedEvent/Client", function (req, res) {



    events
        .find()
        .exec()
        .then((data) => {
            console.log("data", data);
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

router.get('/getAddedEvent', (req, res) => {

    const GameType = req.body.GameType;
    const Username = req.body.Username
    console.log('getcart.customer_id', Username)
    events.find({ Username: Username, GameType: GameType })
        .then(function (data) {
            res.json(
                data
            );
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })

});

module.exports = router