const express = require('express');

const cors = require('cors')
// const route_organizer_details = require('./route/organizer_details_route')
const db = require('./database/db');
const bodyParser = require('body-parser');
const playerSignup_route = require('./Routes/playerSignup_route')
//const playerSignup_model = require('..Model/playerSignup_model')

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false}))

app.use(playerSignup_route)

app.listen(80);