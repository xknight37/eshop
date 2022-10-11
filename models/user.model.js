//create user model

const mongoose = require('mongoose');
const constants = require('../utils/constants')

const userSchema = new mongoose.Schema({
    id : Number,
    email : {
        type : String,
        required : true
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    password : {
        type : String,
        required : true
    },
    phone_number : {
        type : String
    },
    role : {
        type : String,
        required : true,
        default : constants.userRole.user,
        enum : [constants.userRole.user,constants.userRole.admin]
    },
    user_name : {
        type : String
    }
},{timestamps : true, versionKey : false}
);

module.exports = mongoose.model("User",userSchema);