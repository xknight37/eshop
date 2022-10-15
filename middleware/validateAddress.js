/**
 * implementing middleware to perform different checks
 */

// validate if all the fields required for address request are present

exports.validateAddress = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Please provide the required details",
            });
        }

        if (!req.body.zipcode) {
            return res.status(400).send({
                message: "Please provide zipcode",
            });
        }

        if (!req.body.state) {
            return res.status(400).send({
                message: "Please provide State",
            });
        }

        if (!req.body.street) {
            return res.status(400).send({
                message: "Please provide street",
            });
        }

        if (!req.body.city) {
            return res.status(400).send({
                message: "Please provide city",
            });
        }

        if (!req.body.phone) {
            return res.status(400).send({
                message: "Please provide phone number",
            });
        }

        if (!req.body.name) {
            return res.status(400).send({
                message: "Please provide name",
            });
        }

        if (!(req.body.zipcode.length === 6)) {
            return res.status(400).send({
                message: "please enter proper 6 digit zipcode",
            });
        }

        if (req.body.zipcode.length === 6) {
            let val = req.body.zipcode;
            let isnum = /^\d+$/.test(val);
            if (!isnum) {
                return res.status(400).send({
                    message: "Please provide only digits for zipcode",
                });
            }
        }

        if (!(req.body.phone.length === 10)) {
            return res.status(400).send({
                message: "please enter proper 10 digit phone number",
            });
        }

        if (req.body.phone.length === 10) {
            let val1 = req.body.phone;
            let isnum1 = /^\d+$/.test(val1);
            if (!isnum1) {
                return res.status(400).send({
                    message: "Please provide only digits for phone number",
                });
            }
        }

        const token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(401).send({
                message: "Token not provided! Please login!",
            });
        }

        next();
    } catch (err) {
        console.log("Some internal error occurred while validating address");
        return res.status(500).send({
            message: "Some internal error occurred while validating address",
        });
    }
};
