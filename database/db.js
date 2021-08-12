const mongoose = require('mongoose')

// var uri = "mongodb://127.0.0.1:27017/PlayM8"      //local host ko lagi
var uri = "mongodb+srv://playm8:p%40ssword123@play-m8.b3c9f.mongodb.net/playM8?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Database Connection Established Successfully");
});


