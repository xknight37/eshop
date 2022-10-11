//we need the model here

const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    
}