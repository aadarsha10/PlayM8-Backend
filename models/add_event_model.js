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
    GameDate: {
        type: String,
        required: true
    },
    Prize: {
        type: String,
        required: false
    },
    Venue: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    Username : {
        type : String,
        required : true,
        
    }
})

module.exports = events