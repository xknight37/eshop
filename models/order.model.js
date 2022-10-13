// model for order 

const mongoose = require('mongoose');

const User = require('../models/user.model');
const Address = require('../models/address.model')
const Product = require('../models/product.model');
// const Double = require('@mongoosejs/double');

const orderSchema = new mongoose.Schema({
    // id : Number,
    amount : {
        type : Number,
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Product
    },
    addressId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Address
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    orderDate : {
        type : Date,
        required : true
    },
    quantity : Number
},{timestamps : true, versionKey : false})

module.exports = mongoose.model('Order',orderSchema);