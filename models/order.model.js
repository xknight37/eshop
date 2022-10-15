// model for order

const mongoose = require("mongoose");

const User = require("../models/user.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");

const orderSchema = new mongoose.Schema(
    {
        _id: Number,
        amount: {
            type: Number,
            required: true,
        },
        productId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: Number,
            ref: Product,
        },
        addressId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: Number,
            ref: Address,
        },
        userId: {
            // type: mongoose.Schema.Types.ObjectId,
            type: Number,
            ref: User,
        },
        // productId: Number,
        // addressId: Number,
        // userId: Number,
        orderDate: {
            type: Date,
            required: true,
        },
        quantity: Number,
    },
    { _id: false },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
