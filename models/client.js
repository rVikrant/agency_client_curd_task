"use strict";

// dependencies
const mongoose = require("mongoose");
const { cli } = require("winston/lib/winston/config");

// schema object 
const Schema = mongoose.Schema;

// agency schema
const client = new Schema({
    // feature fields
    clientId: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    agencyId: {
        type: Schema.ObjectId,
        index: true,
        required: true,
        ref: "agency"
    },
    name: {
        type: String,
        index: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    phoneNo: {
        type: String,                      // countryCode + phoneNumner like +912345609871
        required: true,
    },
    totalBill: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('client', client);