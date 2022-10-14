//check if the x auth token is valid or not
// also to check if the user is admin or not

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.validateToken = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"];

        // if no token , unauthorized to access endpoint
        if (!token) {
            return res.status(401).send({
                message: "Please login first to access this endpoint!",
            });
        }

        jwt.verify(token, secretConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Please login first to access this endpoint!",
                });
            }
            req.email = decoded.email;
            next();
        });
    } catch (err) {
        console.log("Some internal error occurred while validating token");
        return res.status(500).send({
            message: "Some internal error occurred while validating token",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        var emailObj = "";

        const tokenObj = req.headers["x-auth-token"];

        if (!tokenObj) {
            return res.status(401).send({
                message: "Please login first to access this endpoint!",
            });
        }

        jwt.verify(tokenObj, secretConfig.secret, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Please login first to access this endpoint!",
                });
            }
            emailObj = decoded.email;
        });

        const userObj = await User.findOne({ email: emailObj });

        if (userObj && userObj.role == constants.userRole.admin) {
            next();
        } else {
            return res.status(403).send({
                message: "You are not authorised to access this endpoint!",
            });
        }
    } catch (err) {
        console.log("Some internal error occurred");
        return res.status(500).send({
            message: "Some internal error occured",
        });
    }
};
