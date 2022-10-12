//check if the x auth token is valid or not
// also to check if the user is admin or not

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretConfig = require('../configs/auth.config');
const User = require('../models/user.model');

exports.validateToken = async (req,res,next)=>{
    
    const token = req.headers['x-auth-token'];

    // if no token , unauthorized to access endpoint
    if(!token){
        return res.status(401).send({
            message : "Please login first to access this endpoint!"
        })
    }

    jwt.verify(token,secretConfig.secret,(err,decoded)=>{
        if(err){
            res.status(401).send({
                message : "Please login first to access this endpoint!"
            })
        }
        req.email = decoded.email;
        next();

    })

    
}
