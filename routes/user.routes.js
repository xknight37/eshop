// need the controller and the necessary middleware for this

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/validateBody');

module.exports = (app)=>{
    app.post('/eshop/api/v1/users',[userMiddleware.validateBody],userController.userSignup);

    app.post('/eshop/api/v1/auth',[userMiddleware.validateCreds],userController.userLogin);
}