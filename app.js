'use strict';
const express = require('express');
const compression = require('compression');
var bodyParser = require('body-parser');

const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/authenticate', require('./routes/authenticationRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/version', require('./routes/versionRoute'));

module.exports = app;
