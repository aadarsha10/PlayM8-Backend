const mongoose = require('mongoose')

// var uri = "mongodb://127.0.0.1:27017/PlayM8"
var uri = "mongodb+srv://playm8:p%40ssword123@play-m8.b3c9f.mongodb.net/playM8?"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Database Connection Established Successfully");
});


//ssh testing