/**
 * implementing middleware to perform different checks for creating new orders
 */

// validate the details for creating a order

const Product = require("../models/product.model");
const Address = require("../models/address.model");

exports.validateOrder = async (req, res, next) => {
    if (!req.body.productId) {
        return res.status(400).send({
            message: "Please enter Product ID",
        });
    }

    if (!req.body.addressId) {
        return res.status(400).send({
            message: "Please enter Address ID",
        });
    }

    if (!typeof req.body.productId === Number) {
        return res.status(400).send({
            message: "Please enter Product ID that is a number",
        });
    }

    if (!typeof req.body.addressId === Number) {
        return res.status(400).send({
            message: "Please enter Address ID that is a number",
        });
    }

    const productId = req.body.productId;
    const addressId = req.body.addressId;

    const productObj = await Product.findOne({ _id: productId });
    const addressObj = await Address.findOne({ _id: addressId });

    if (!productObj) {
        return res.status(404).send({
            message: `No Product found for ID - ${productId}!`,
        });
    }
    if (!addressObj) {
        return res.status(404).send({
            message: `No Address found for ID - ${addressId}!`,
        });
    }

    if (productObj.availableItems === 0) {
        return res.status(400).send({
            message: `Product with ID - ${productId} is currently out of stock!`,
        });
    }

    next();
};
