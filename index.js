/**
 * start the server and whole lot of other things
 */

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');


app.listen(serverConfig.PORT,()=>{
    console.log(`Server started at port ${serverConfig.PORT}`);
})
