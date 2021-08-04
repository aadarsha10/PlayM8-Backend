const express = require("express");
const router = express.Router();
const men = require("../models/MenSingles_model");

router.post("/players_entry/menssingles", function (req, res) {
  const PlayerFullName = req.body.PlayerFullName;
  const PlayerSN = req.body.PlayerSN;
  const PlayerRepresentation = req.body.PlayerRepresentation;

  console.log(PlayerFullName, PlayerSN, PlayerRepresentation);

  const me = new men({
    PlayerFullName: PlayerFullName,
    PlayerSN: PlayerSN,
    PlayerRepresentation: PlayerRepresentation,
  });

  me.save()
    .then(function (result) {
      res.json({
        message: "successfully added player",
        PlayerSN: PlayerSN,
      });
    })
    .catch(function (err) {
      res.json({
        error: err,
        PlayerSN: PlayerSN,
      });
    });
});

router.get("/getMenSinglesPlayer", function (req, res) {
  men
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

module.exports = router;
