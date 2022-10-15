/**
 * implementing middleware to perform different checks for creating new orders
 */

// validate the details for creating a order

exports.validateOrder = async (req, res, next) => {
    if (!req.body.productId) {
        return res.status(400).send({
            message: "Please enter Product ID",
        });
    }

    if (!req.body.addressId) {
        return res.status(400).send({
            message: "Please enter Address ID",
        });
    }

    if (!typeof req.body.productId === Number) {
        return res.status(400).send({
            message: "Please enter Product ID that is a number",
        });
    }

    if (!typeof req.body.addressId === Number) {
        return res.status(400).send({
            message: "Please enter Address ID that is a number",
        });
    }

    next();
};
