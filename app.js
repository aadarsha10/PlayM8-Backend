const express = require('express');

const cors = require('cors')
const route_organizer_details = require('./route/organizer_route')
const route_admin = require('./route/admin_route')
const db = require('./database/db');
const bodyParser = require('body-parser');
const playerSignup_route = require('./route/playerSignip_route')


const app = express();
app.use(cors());
app.use(express.json());


app.use(route_organizer_details)
app.use(route_admin)


app.listen(80);