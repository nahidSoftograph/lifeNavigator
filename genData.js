let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

// import database model
let Accomplishment = require('./models/accomplishment'),
    AssessRisk = require('./models/assessRisk');


let databaseConfig = require('./config/database');

mongoose.connect(databaseConfig.url);

console.log('Database connected');
