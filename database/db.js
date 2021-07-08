const mongoose = require('mongoose')

var uri = "mongodb://127.0.0.1:27017/PlayM8"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Database Connection Established Successfully");
});