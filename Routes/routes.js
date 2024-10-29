const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');
const productController = require('../Controllers/productController')
const customerController = require('../Controllers/customerController')
const orderController = require('../Controllers/orderController')

const jwtMiddleWare = require('../MiddleWares/jwtMiddleWare');

router.post('/login', userController.login);
router.post('/products-and-services', jwtMiddleWare, productController.addProduct)
router.get('/products-and-services', jwtMiddleWare, productController.getAllProducts);
router.put('/products-and-services/:id', jwtMiddleWare, productController.editProduct);
router.delete('/products-and-services/:id', jwtMiddleWare, productController.deleteProduct);

router.post('/customers', jwtMiddleWare, customerController.createCustomer);
router.get('/customers', jwtMiddleWare, customerController.fetchCustomers);
router.put('/customers/:id', jwtMiddleWare, customerController.editCustomer);
router.delete('/customers/:id', jwtMiddleWare, customerController.deleteCustomer);

router.post('/orders', jwtMiddleWare, orderController.addOrder);
router.get('/orders', jwtMiddleWare, orderController.fetchAllOrders);
router.put('/orders/:id', jwtMiddleWare, orderController.renewOrder);
router.delete('/orders/:id', jwtMiddleWare, orderController.deleteOrder);

router.get('/orders/:id', orderController.fetchOrderById);
router.put('/orders/make-payment/:id', orderController.changePaymentStatus);

module.exports = router;