const mongoose = require('mongoose')

const C_events = mongoose.model('Client Events', {

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

module.exports = C_events