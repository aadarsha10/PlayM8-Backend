const express = require('express')
const router = express.Router()
const events = require('../models/add_event_model')



router.post('/organizer/addEvent', function (req, res) {

    const GameTitle = req.body.GameTitle
    const GameType = req.body.GameType
    const Image = req.body.Image
    const GameDate = req.body.Date
    const Prize = req.body.Prize
    const Venue = req.body.Venue
    const Description = req.body.Description

    const eventDetail = new eventDetails({

        GameTitle: GameTitle,
        GameType: GameType,
        Image: Image,
        GameDate : GameDate,
        Prize : Prize,
        Venue : Venue,
        Description: Description
    })

    console.log("event", eventDetail)

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

router.get("/getAddedEvent", function (req, res) {
    events
      .find()
      .exec()
      .then((data) => {
        console.log("data", data);
        res.json( data );
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

module.exports = router