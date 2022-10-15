const Order = require("../models/order.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");
const Product = require("../models/product.model");
const ProductCount = require("../models/productCounter.model");

exports.createOrder = async (req, res) => {
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

        const userEmail = req.email;
        const addressId = req.body.addressId;
        const productId = req.body.productId;
        var x = new Date().toISOString();

        const productObj = await Product.findOne({ _id: productId });
        const addressObj = await Address.findOne({ _id: addressId });

        const userObj = await User.findOne({ email: userEmail });

        const orderObj = {
            _id: c.seq,
            amount: req.body.quantity ?? 1 * productObj.price,
            productId: productObj._id,
            addressId: addressObj._id,
            userId: userObj._id,
            orderDate: x,
            quantity: req.body.quantity,
        };

        const obj = await Order.create(orderObj);
        let resultObj = await Order.findOne({ _id: obj._id })
            .populate("productId")
            .populate("addressId")
            .populate("userId");

        return res.status(201).send(resultObj);
    } catch (err) {
        console.log("Some internal error occurred", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while creating order",
        });
    }
};
