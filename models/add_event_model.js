const mongoose = require('mongoose')

const events = mongoose.model('Events', {

    GameTitle: {
        type: String,
        required: true
    },
    GameType: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: false
    },

    Description: {
        type: String,
        required: true
    }
})

module.exports = events