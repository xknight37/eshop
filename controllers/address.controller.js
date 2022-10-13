const User = require("../models/user.model");
const Address = require("../models/address.model");

exports.addAddress = async (req, res) => {
    try {
        const emailObj = req.email;

        const userObj = await User.findOne({ email: emailObj });

        const addressObj = {
            name: req.body.name,
            city: req.body.city,
            phone: req.body.phone,
            state: req.body.state,
            street: req.body.street,
            zipcode: req.body.zipcode,
            landmark: req.body.landmark ?? "",
            userId: userObj._id,
        };

        const address = await Address.create(addressObj);

        res.status(201).send(address);
    } catch (err) {
        console.log("Some internal error occurred", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while adding address",
        });
    }
};
