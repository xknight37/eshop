// model for order

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = require("../models/user.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");

const orderSchema = new mongoose.Schema(
    {
        // _id: Number,
        amount: {
            type: Number,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Address,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        quantity: Number,
    },
    // { _id: false },
    { timestamps: true, versionKey: false }
);
// orderSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Order", orderSchema);
