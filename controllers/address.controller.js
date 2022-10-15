/**
 * This needs the user , address and addresscount models
 */

const User = require("../models/user.model");
const Address = require("../models/address.model");
const AddressCount = require("../models/addressCounter.model");

// this is for adding new address

exports.addAddress = async (req, res) => {
    try {
        const a = await AddressCount.find().count();
        if (a == 0) {
            const counterObj = {
                _id: "addressId",
            };
            const b = await AddressCount.create(counterObj);
        }
        const c = await AddressCount.findOneAndUpdate(
            { _id: "addressId" },
            { $inc: { seq: 1 } },
            { returnNewDocument: true }
        );
        const emailObj = req.email;

        const userObj = await User.findOne({ email: emailObj });

        console.log(c.seq);

        const addressObj = {
            _id: c.seq,
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

        let resultObj = await Address.findOne({ _id: address._id }).populate(
            "userId"
        );

        res.status(201).send(resultObj);
    } catch (err) {
        console.log("Some internal error occurred", err.message);
        return res.status(500).send({
            message: "Some internal error occurred while adding address",
        });
    }
};
