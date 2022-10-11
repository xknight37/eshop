// model for order 

const mongoose = require('mongoose');

const User = require('../models/user.model');
const Address = require('../models/address.model')
const Product = require('../models/product.model');
const Double = require('@mongoosejs/double');

const orderSchema = new mongoose.Schema({
    id : Number,
    amount : {
        type : Double,
        required : true
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Product
    },
    address_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Address
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    }

})

module.exports = mongoose.model('Order',orderSchema);