const mongoose = require("mongoose");

const orderCounter = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("OrderCount", orderCounter);
