const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');
const productController = require('../Controllers/productController')

const jwtMiddleWare = require('../MiddleWares/jwtMiddleWare');

router.post('/login', userController.login);
router.post('/products-and-services', jwtMiddleWare, productController.addProduct)
router.get('/products-and-services', jwtMiddleWare, productController.getAllProducts);
router.put('/products-and-services/:id', jwtMiddleWare, productController.editProduct);
router.delete('/products-and-services/:id', jwtMiddleWare, productController.deleteProduct);
 

module.exports = router;