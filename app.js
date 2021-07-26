const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const route_organizer_details = require('./route/organizer_route')
const route_admin = require('./route/admin_route');
const route_player = require('./route/playerSignup_route');
const request_route = require("./route/admin_request_route");
require('./database/db');

// -----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// -----
// API******************//
app.use(route_organizer_details)
app.use(route_admin)
app.use(route_player)
app.use(request_route);

// // -----
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
// ---server port config
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});