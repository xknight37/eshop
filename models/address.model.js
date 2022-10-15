// model for address
const mongoose = require("mongoose");

const User = require("../models/user.model");

const addressSchema = new mongoose.Schema(
    {
        _id: Number,
        city: {
            type: String,
            required: true,
        },
        landmark: String,
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        },
        userId: [
            {
                // type: mongoose.Schema.Types.ObjectId,
                type: Number,
                ref: User,
            },
        ],
        // userId: Number,
    },
    { _id: false },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Address", addressSchema);
