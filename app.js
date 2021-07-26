const express = require("express");

const cors = require("cors");
const route_organizer_details = require("./route/organizer_route");

const db = require("./database/db");
const bodyParser = require("body-parser");
const playerSignup_route = require("./route/playerSignup_route");
const addEvent = require('./route/add_event')
const route_admin = require('./route/admin_route')

const app = express();
app.use(cors());
app.use(express.json());

app.use(route_organizer_details);
app.use(route_admin);
app.use(playerSignup_route);
app.use(addEvent)


// app.listen(90);
app.listen(process.env.PORT || 90);
