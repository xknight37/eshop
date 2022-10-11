//we need the model here

const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authSecret = require("../configs/auth.config");

exports.userSignup = async (req,res)=>{
    /**
     * cant get to implement the very idea i had - man this is not cool
     * i wanted to find the maximum value of id present and +1 it 
     */
    // const a = User.count();
    // console.log(JSON.stringify(a));
    const userObj = {
        id : await User.find().count()+1,
        email : req.body.email,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        password : bcrypt.hashSync(req.body.password,10),
        phone_number : req.body.phone_number
    }
    try{

        const user = await User.create(userObj);

        const userResp = {
            id : user.id,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email
        }

        return res.status(201).send(userResp);

    }catch(err){
        console.log("Error occurred while creating user",err.message);
    }
    console.log("inside usersignup method, testing complete")

}


exports.userLogin = async (req,res)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.status(400).send({
            message : "This email has not been registered!"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordValid){
        return res.status(400).send({
            message : "Invalid Credentials!"
        })
    }

    // create json web token

    const token = jwt.sign({id:user.id},authSecret.secret,{expiresIn:300});

    res.setHeader('x-auth-token',token);

    res.status(200).send({
        email : user.email,
        name : user.first_name + user.last_name,
        isAuthencticated : true
    })
    
}