const express = require('express');

const cors = require('cors')
<<<<<<< HEAD
// const route_organizer_details = require('./route/organizer_details_route')
const db = require('./database/db');
const bodyParser = require('body-parser');
const playerSignup_route = require('./Routes/playerSignup_route')
//const playerSignup_model = require('..Model/playerSignup_model')
=======
const route_organizer_details = require('./route/organizer_route')
const route_admin = require('./route/admin_route')
const db = require('./database/db');
const bodyParser = require('body-parser');
const playerSignup_route = require('./route/playerSignup_route')

>>>>>>> d44d65cbf259055f9b63da9835b775b4a5f2d96d

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}))

<<<<<<< HEAD
=======
app.use(route_organizer_details)
app.use(route_admin)
>>>>>>> d44d65cbf259055f9b63da9835b775b4a5f2d96d
app.use(playerSignup_route)


// app.listen(90);
app.listen(process.env.PORT || 90)