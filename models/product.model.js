// model for product

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        _id: Number,
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        availableItems: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
    },
    { _id: false, timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
