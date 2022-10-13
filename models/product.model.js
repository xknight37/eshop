// model for product 

const mongoose = require('mongoose');
// const Double = require('@mongoosejs/double');


const productSchema = new mongoose.Schema({
    // product_id : {
    //     type : Number
    // },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    availableItems : {
        type : Number
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    },
    manufacturer : {
        type : String,
        required : true
    }
},{timestamps : true , versionKey : false}
)

module.exports = mongoose.model('Product',productSchema);