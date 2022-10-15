/**
 *  creating the address Counter model , this is used to track the progression of the _id counter for address  model
 */

const mongoose = require("mongoose");

const addressCounter = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("AdressCount", addressCounter);
