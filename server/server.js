'use strict';

const path = require('path');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personRouter = require('./routes/personRouter');

const app = express();
let port = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use('/css', express.static(path.join(__dirname, '..', 'node_modules/bulma/css')));

app.use('/api/person', personRouter);

mongoose.connect('mongodb://localhost/personList', () => {
    console.log('connected to mongodb');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});