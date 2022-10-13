
const productController = require('../controllers/product.controller');
const productMiddleware = require('../middleware/validateProduct');
const checkjwt = require('../middleware/checkjwt')

module.exports = (app)=>{
    app.get('/eshop/api/v1/products',productController.getAllProducts);

    app.get('/eshop/api/v1/products/categories',productController.getProductCategories);
    
    app.get('/eshop/api/v1/products/:id',productController.getProductById);

    app.post('/eshop/api/v1/products',[checkjwt.isAdmin,productMiddleware.validateProduct],productController.createProduct)

    app.put('/eshop/api/v1/products/:id',[checkjwt.isAdmin,productMiddleware.validateForUpdate],productController.updateProduct)

    app.delete('/eshop/api/v1/products/:id',[checkjwt.isAdmin],productController.deleteObject)
}