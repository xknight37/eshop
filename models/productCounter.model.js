/**
 *  creating the product Counter model , this is used to track the progression of the _id counter for product model
 */

const mongoose = require("mongoose");

const productCounter = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("ProductCount", productCounter);
