const mongoose = require('mongoose')

const organizer = mongoose.model('Organizer', {

    Fullname: {
        type: String,
        required: true

    },
    Address: {
        type: String,
        required: true
    },

    Contact: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        unique: true
    },

    Email: {
        type: String,
        require: true,
        unique: true
    },

    Password: {
        type: String,
        
    }
})

module.exports = organizer