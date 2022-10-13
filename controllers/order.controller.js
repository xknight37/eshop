
const Order = require("../models/order.model");
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');

exports.createOrder = async (req,res)=>{

    const userEmail = req.email;
    const addressId = req.body.addressId;
    const productId = req.body.productId;
    var a = new Date().toISOString()

    const productObj = await Product.findOne({_id : productId});
    const addressObj = await Address.findOne({_id : addressId}); 
    const userObj = await User.findOne({email : userEmail});

    // console.log(productObj);
    // console.log(addressObj);
    // console.log(userObj);
    // console.log(req.body.quantity)
    // console.log(productObj.price)
    // console.log(req.body.productId)
    // console.log(productObj.price);
    // console.log(typeof productObj.price);
    // console.log(typeof req.body.quantity);




    const orderObj = {
        amount : req.body.quantity??1  * productObj.price,
        productId : productObj._id,
        addressId : addressObj._id,
        userId : userObj._id,
        orderDate : a,
        quantity : req.body.quantity
    }
    
    const obj = await Order.create(orderObj);
    let resultObj = await Order.findOne({_id : obj._id}).populate('productId').populate('addressId').populate('userId');

    return res.status(201).send(resultObj);

}