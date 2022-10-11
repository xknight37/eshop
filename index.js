/**
 * start the server and whole lot of other things
 */

const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.listen(8080,()=>{
    console.log("Server started at port 8080");
})
