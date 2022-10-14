//create user model

const mongoose = require("mongoose");
const constants = require("../utils/constants");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
    {
        _id: Number,
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
    { _id: false },
    { timestamps: true, versionKey: false }
);
userSchema.plugin(AutoIncrement);

module.exports = mongoose.model("User", userSchema);
