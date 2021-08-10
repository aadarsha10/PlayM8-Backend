const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')


router.post('/uploadImage', upload.single('image'), (req, res) => {
    res.send(req.file)
    console.log("Done", req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router