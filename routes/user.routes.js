// need the controller and the necessary middleware for this

const userController = require('../controllers/user.controller');

module.exports = (app)=>{
    app.post('/api/v1/eshop/users',userController.userSignup);

    app.post('/api/v1/eshop/auth',userController.userLogin);
}