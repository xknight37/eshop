/**
 * start the server and whole lot of other things
 */

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const constants = require("./utils/constants");

// use middleware to read json req body
app.use(express.json());

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to database");
});

db.once("open", () => {
    console.log("Connected to MongoDB Database");

    init();
});

async function init() {
    /**
     * assuming there is only one admin , am finding out based on userRole
     * if there is an admin , that's it.
     */

    try {
        const adminUser = await User.findOne({
            role: constants.userRole.admin,
        });
        if (adminUser) {
            console.log("Admin already exits");
            return;
        }
    } catch (err) {
        console.log("Error while fetching user", err.message);
    }
    try {
        const user = await User.create({
            userName: "admin",
            role: constants.userRole.admin,
            password: bcrypt.hashSync("password", 10),
            email: "admin@upgrad.com",
        });
        console.log("Admin created");
    } catch (err) {
        console.log("Error while storing the user", err.message);
    }
}

require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port : ${serverConfig.PORT}`);
});
