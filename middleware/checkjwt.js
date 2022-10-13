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
        return res.status(500).send({
            message: "some internal error occured",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "Please provide an email",
        });
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Please provide a password",
        });
    }

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
    // console.log(emailObj);

    const userObj = await User.findOne({ email: emailObj });
    // console.log(userObj.role);

    if (userObj && userObj.role == constants.userRole.admin) {
        next();
    } else {
        return res.status(403).send({
            message: "You are not authorised to access this endpoint!",
        });
    }
};
