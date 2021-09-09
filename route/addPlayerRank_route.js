const express = require('express')
const router = express.Router()
const MenSingles_Ranking = require('../models/playerRank_model')
const upload = require('../middleware/upload')

router.post('/admin/playerRank/MenSingles', upload.single('image'), function (req, res) {

    console.log(req.body);

    if (req.file == undefined) {
        console.log("file aayo????", req.file)
        return res.status(400).json({
            message: "Invalid file format"
        })
    }

    const image = req.file.filename
    const Fullname = req.body.fullname
    const TopRankSwitch = req.body.topRankSwitch
    const Rank = req.body.rank
    const Representaion = req.body.representation


    const menSingle_ranking = new MenSingles_Ranking({

        Fullname: Fullname,
        PlayerRank: Rank,
        Representation: Representaion,
        Image: image,
        TopPlayer: TopRankSwitch
    })

    console.log("Rank", TopRankSwitch)

    menSingle_ranking.save().then(function () {
        // res.send(image)
        res.status(201).json({
            success: true,
            message: "Player Rank Added"
        })
    })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})
module.exports = router;