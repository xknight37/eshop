
const orderController = require('../controllers/order.controller');
const orderMiddleware = require('../middleware/validateOrder');
const jwt = require('../middleware/checkjwt')

module.exports=(app)=>{

    app.post('/eshop/api/v1/orders',[jwt.validateToken,orderMiddleware.validateOrder],orderController.createOrder);
}