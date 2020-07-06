'use strict';

// npm modules
const mongoose = require('mongoose');

// constructor
const Schema = mongoose.Schema;

const admin = new Schema({
    // admin feature keys
    name: {type: String, trim: true, default: null},
    email: {type: String, trim: true, default: null, index: true},
    password: {type: String, required:true},
    accessToken: {type: String},
    issuedAt: {type: Number},

    // date time log key
    registrationDate: {type: Date, default: Date.now(), required: true}
});

module.exports = mongoose.model('admin', admin);