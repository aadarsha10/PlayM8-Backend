const express = require('express')
const router = express.Router()
const upload = require('../middleware/image_upload')

router.post('/uploadImage', upload.single('image'), (req, res) => {
    res.send(req.body.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router;