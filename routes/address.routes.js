//get to work on this

const addressController = require("../controllers/address.controller");
const addressMiddleware = require("../middleware/validateAddress");
const checkjwt = require("../middleware/checkjwt");

module.exports = (app) => {
    app.post(
        "/eshop/api/v1/addresses",
        [addressMiddleware.validateAddress, checkjwt.validateToken],
        addressController.addAddress
    );
};
