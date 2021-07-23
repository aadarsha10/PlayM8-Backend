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

// // -----
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
// -----
// const port = process.env.PORT || 90;
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});