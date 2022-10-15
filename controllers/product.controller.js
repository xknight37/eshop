const Product = require("../models/product.model");
const ProductCount = require("../models/productCounter.model");

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).send(allProducts);
    } catch (err) {
        console.log("Error while fetching Products", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while fetching Products",
        });
    }
};

exports.getProductCategories = async (req, res) => {
    try {
        const listOfCategories = await Product.distinct("category");
        return res.status(200).send(listOfCategories);
    } catch (err) {
        console.log("Error while fetching Product categories", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while fetching Categories",
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const idObj = req.params.id;
        if (isNaN(idObj)) {
            return res.status(400).send({
                message: "Please enter a valid number as product id ",
            });
        }
        const productObj = await Product.findById(idObj);
        if (!productObj) {
            return res.status(404).send({
                message: `No Product found for ID - ${idObj}!`,
            });
        }
    } catch (err) {
        console.log("Error while fetching Product details", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while fetching Product",
        });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const a = await ProductCount.find().count();
        if (a == 0) {
            const counterObj = {
                _id: "productId",
            };
            const b = await ProductCount.create(counterObj);
        }
        const c = await ProductCount.findOneAndUpdate(
            { _id: "productId" },
            { $inc: { seq: 1 } },
            { returnNewDocument: true }
        );

        const productObj = {
            _id: c.seq,
            name: req.body.name,
            price: req.body.price,
            availableItems: req.body.availableItems,
            category: req.body.category,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            manufacturer: req.body.manufacturer,
        };

        const prod = await Product.create(productObj);

        return res.status(201).send(prod);
    } catch (err) {
        console.log("Error while creating Product", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while creating Product",
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const prodId = req.params.id;

        const prodObj = await Product.findOne({ _id: prodId });

        if (!prodObj) {
            return res.status(404).send({
                message: `No Product found for ID - ${prodId}!`,
            });
        }

        const newObj = {
            name: req.body.name,
            price: req.body.price,
            availableItems: req.body.availableItems,
            category: req.body.category,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            manufacturer: req.body.manufacturer,
        };

        const filter = { _id: prodId };

        const updatedObj = await Product.findOneAndUpdate(filter, newObj, {
            new: true,
        });

        return res.status(200).send(updatedObj);
    } catch (err) {
        console.log("Error while creating Product", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while updating Product",
        });
    }
};

exports.deleteObject = async (req, res) => {
    try {
        const idObj = req.params.id;

        const objToDelete = await Product.findOneAndDelete({ _id: idObj });

        if (!objToDelete) {
            return res.status(404).send({
                message: `No Product found for ID - ${idObj}!`,
            });
        }

        return res.status(200).send({
            message: `Product with ID - ${idObj} deleted successfully!`,
        });
    } catch (err) {
        console.log("Error while creating Product", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while deleting Product",
        });
    }
};
