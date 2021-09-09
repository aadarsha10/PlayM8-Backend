const mongoose = require('mongoose')

const Rank_MenSingles = mongoose.model('MenSinglesRank', {

    Fullname: {
        type: String,
        required: true

    },
    PlayerRank: {
        type: String,
        required: true,
        unique : true
    },

    Representation: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required : true
    },

    TopPlayer: {
        type: Boolean,
        required: true,
        
    },

})

module.exports = Rank_MenSingles