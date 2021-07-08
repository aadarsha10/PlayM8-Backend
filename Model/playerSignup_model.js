const mongoose = require('mongoose')

const Player = mongoose.model('player',{
    firstName:{
        type:String,
         required : true
    },
    lastName:{
        type : String,
         required : true
    },
    userName:{
        type : String,
         required : true,
         unique : true
    },
    password:{
        type:String,
         required:true
        },
    email:{
        type : String,
         required : true,
          unique : true
        },
    contact:
    {
        type: String,
         required : true
    },
})

module.exports = Player;