const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const route_organizer_details = require('./route/organizer_route')
const route_admin = require('./route/admin_route');
const route_player = require('./route/playerSignup_route');
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

// const users = require('/api/users');
// app.use('/api/users', users);
//********************** */
// // -----
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
// -----
const port = process.env.PORT || 90;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});