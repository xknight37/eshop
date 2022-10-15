/**
 * implementing middleware to perform different checks for products
 */

const Product = require("../models/product.model");

exports.validateProduct = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please provide name for the product",
        });
    }

    if (!req.body.category) {
        return res.status(400).send({
            message: "Please provide category for the product",
        });
    }

    if (!req.body.availableItems) {
        return res.status(400).send({
            message: "Please provide availableItems for the product",
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Please provide description for the product",
        });
    }

    if (!req.body.imageUrl) {
        return res.status(400).send({
            message: "Please provide imageUrl for the product",
        });
    }

    if (!req.body.manufacturer) {
        return res.status(400).send({
            message: "Please provide manufacturer for the product",
        });
    }

    if (!req.body.price) {
        return res.status(400).send({
            message: "Please provide price for the product",
        });
    }

    next();
};

exports.validateForUpdate = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please provide name for the product",
        });
    }

    if (!req.body.category) {
        return res.status(400).send({
            message: "Please provide category for the product",
        });
    }

    if (!req.body.availableItems) {
        return res.status(400).send({
            message: "Please provide availableItems for the product",
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Please provide description for the product",
        });
    }

    if (!req.body.imageUrl) {
        return res.status(400).send({
            message: "Please provide imageUrl for the product",
        });
    }

    if (!req.body.manufacturer) {
        return res.status(400).send({
            message: "Please provide manufacturer for the product",
        });
    }

    if (!req.body.price) {
        return res.status(400).send({
            message: "Please provide price for the product",
        });
    }

    next();
};
