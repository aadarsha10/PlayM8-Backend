const express = require('express')
const router = express.Router()
const organizer = require('../model/organizer_detail_model')
const { check, validationResult } = require('express-validator')
