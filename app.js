const express = require('express');

const cors = require('cors')
const route_organizer_details = require('./route/organizer_details_route')
const db = require('./database/db');
const bodyParser = require('body-parser');
const playerSignup_route = require('./Routes/playerSignip_route')

const app = express();
app.use(cors());
app.use(express.json());


app.use(route_organizer_details)
app.use(playerSignup_route)

app.listen(80);