const User = require('../models/user.model');
const Address = require('../models/address.model');

exports.addAddress =async  (req,res)=>{

    // do something
    // console.log(req.body);
    const emailObj = req.email;

    const userObj = await User.findOne({email : emailObj});

    const addressObj = {
        name : req.body.name,
        city : req.body.city,
        phone : req.body.phone,
        state : req.body.state,
        street : req.body.street,
        zipcode : req.body.zipcode,
        landmark : req.body.landmark??"",
        userId : userObj._id
    }

    const address = await Address.create(addressObj);
    // address.userId.push(userObj);
    // address.save();

    res.status(201).send(address);
}