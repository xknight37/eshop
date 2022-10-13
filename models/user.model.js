//create user model

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            default: constants.userRole.user,
            enum: [constants.userRole.user, constants.userRole.admin],
        },
        userName: {
            type: String,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
