//create user model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : Number,
    email : {
        type : String,
        required : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone_number : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "USER",
        enum : ["USER","ADMIN"]
    },
    user_name : {
        type : String,
        required : true
    }
},{timestamps : true, versionKey : false}
);

module.exports = mongoose.model("User",userSchema);