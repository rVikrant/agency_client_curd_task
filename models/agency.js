"use strict";

// dependencies
const mongoose = require("mongoose");

// schema object 
const Schema = mongoose.Schema;

// agency schema
const agency = new Schema({
    // feature fields
    agencyId: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        index: true,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,                      // countryCode + phoneNumner like +912345609871
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    correspondence: {
        type: String,
    },

    // status log key
    status: {
        type: String,
        enum: status,                       // active/blocked/deleted
        default: status[0]               // default active
    },

    // time log keys
    createdAt: {
        type: Number,                         // in millisec
        default: Date.now()
    },
    updatedAt: {
        type: Number,                         // in millisec
        default: Date.now()
    }
});

module.exports = mongoose.model('agency', agency);