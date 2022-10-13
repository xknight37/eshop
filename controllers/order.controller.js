
const Order = require("../models/order.model");
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');

exports.createOrder = async (req,res)=>{

    const userEmail = req.email;
    const addressId = req.body.addressId;
    const productId = req.body.productId;
    var a = new Date().toISOString()

    const productObj = Product.find({_id : productId});
    const addressObj = Address.find({_id : addressId}); 
    const userObj = User.find({email : userEmail});

    const orderObj = {
        amount : req.body.quantity * productObj.price,
        productId : productObj._id,
        addressId : addressObj._id,
        userId : userObj._id,
        orderDate : a,
        quantity : req.body.quantity
    }
    
    const obj = Order.create(orderObj);

    return res.status(201).send(obj);

}