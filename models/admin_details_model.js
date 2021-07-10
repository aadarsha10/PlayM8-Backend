const mongoose = require('mongoose')

const admin = mongoose.model('Admin', {

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
        required: true,
        unique: true
    },

    Email: {
        type: String,
        require: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    }
})

module.exports = admin