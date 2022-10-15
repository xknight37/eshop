/**
 * implementing middleware to perform different checks
 */

const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");

//check if the x auth token is valid or not

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
                    message: "Unauthorized Token!",
                });
            }
            req.email = decoded.email;
            next();
        });
    } catch (err) {
        console.log(
            "Some internal error occurred while validating token",
            err.message
        );
        return res.status(500).send({
            message: "Some internal error occurred while validating token",
        });
    }
};

// check if the user is admin or not

exports.isAdmin = async (req, res, next) => {
    try {
        var emailObj = "";

        const tokenObj = req.headers["x-auth-token"];

        if (!tokenObj) {
            // req.headers.delete("x-auth-token");
            return res.status(401).send({
                message: "Please login first to access this endpoint!",
            });
        }

        // jwt.verify(tokenObj, secretConfig.secret, (err, decoded) => {
        //     if (err) {
        //         return res.status(401).send({
        //             message: "Unauthorized Token!",
        //         });
        //     }
        //     emailObj = decoded.email;
        // });

        const userObj = await User.findOne({ email: req.email });

        if (userObj && userObj.role == constants.userRole.admin) {
            next();
        } else {
            return res.status(403).send({
                message: "You are not authorised to access this endpoint!",
            });
        }
    } catch (err) {
        console.log("Some internal error occurred", err.message);
        return res.status(500).send({
            message: "Some internal error occured",
        });
    }
};
