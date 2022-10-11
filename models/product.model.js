// model for product 

const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');


const productSchema = new mongoose.Schema({
    product_id : {
        type : Number
    },
    available_items : {
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
    image_url : {
        type : String,
        required : true
    },
    manufacturer : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Double,
        required : true
    }
},{timestamps : true, versionKey : false}
)

module.exports = mongoose.model('Product',productSchema);