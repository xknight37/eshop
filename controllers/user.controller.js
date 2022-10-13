//we need the model here

const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authSecret = require("../configs/auth.config");

exports.userSignup = async (req, res) => {
    /**
     * cant get to implement the very idea i had - man this is not cool
     * i wanted to find the maximum value of id present and +1 it
     */
    // const a = User.count();
    const userObj = {
        // id : await User.find().count()+1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
    };
    try {
        const user = await User.create(userObj);

        const userResp = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        return res.status(201).send(userResp);
    } catch (err) {
        console.log("Error occurred while creating user", err.message);
    }
};

exports.userLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send({
            message: "This email has not been registered!",
        });
    }

    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!isPasswordValid) {
        return res.status(400).send({
            message: "Invalid Credentials!",
        });
    }

    // create json web token

    const token = jwt.sign({ email: user.email }, authSecret.secret, {
        expiresIn: 600,
    });

    res.setHeader("x-auth-token", token);

    res.status(200).send({
        email: user.email,
        name: user.firstName + " " + user.lastName,
        isAuthencticated: true,
    });
};
