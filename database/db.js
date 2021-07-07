const mongoose = require('mongoose')

// var uri = "mongodb://localhost:27017/projects"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Database Connection Established Successfully");
});