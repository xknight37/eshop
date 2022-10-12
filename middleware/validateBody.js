/**
 * middleware logic to perform checks for new users signup
 */

const User = require('../models/user.model');
exports.validateBody = (req,res,next)=>{

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phoneNumber = req.body.phoneNumber;

    if(!firstName){
        return res.status(400).send({
            message : "Please provide first name"
        })
    }

    if(!lastName){
        return res.status(400).send({
            message : "Please provide last name"
        })
    }

    if(!email){
        return res.status(400).send({
            message : "Please provide email"
        })
    }

    if(!password){
        return res.status(400).send({
            message : "Please provide password"
        })
    }

    if(!phoneNumber){
        return res.status(400).send({
            message : "Please provide phone number"
        })
    }

    if(!(phoneNumber.length === 10)){
        return res.status(400).send({
            message : "Invalid contact number!"
        })
    }

    if(phoneNumber.length == 10){
        let val = phoneNumber;
        let isnum =  /^\d+$/.test(val);
        if(!isnum){
            return res.status(400).send({
                message : "Please provide only digits for phone number"
            })
        }        
    }

    if(email){
        let emailObj = email;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(emailObj)){
            return res.status(400).send({
                message : "Invalid email-id format!"
            })
        }
    }

    const userObj = User.findOne({email: email});
    if(!userObj){
        return res.status(400).send({
            message : "Try any other email, this email is already registered!"
        })
    }

    next();
}

exports.validateCreds = (req,res,next)=>{
    try{
    if(!req.body.password && !req.body.email){
        return res.status(400).send({
            message : "Email and password cannot be empty!"
    })}

    if(!req.body.email){
        return res.status(400).send({
            message : "Please provide email"
    })}

    if(!req.body.password){
        return res.status(400).send({
            message : "Please provide password"
    })}

    
    }catch(err){
        return res.status(500).send({
            message : "Some internal error occurred"
        })
    }

    next();
}
