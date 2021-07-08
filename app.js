const express = require('express');

const cors = require('cors')
const route_organizer_details = require('./route/organizer_details_route')
const db = require('./database/db');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());


app.use(route_organizer_details)

app.listen(80);