'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Person = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Person', Person);