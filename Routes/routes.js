const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');
const productController = require('../Controllers/productController')
const customerController = require('../Controllers/customerController')
const orderController = require('../Controllers/orderController')
const supportTickerController = require('../Controllers/supportTickerController')
const agentController = require('../Controllers/agentController');

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


router.post('/support-tickets', jwtMiddleWare, supportTickerController.createSupportTicket);
router.get('/support-tickets', jwtMiddleWare, supportTickerController.fetchSupportTickets);
router.post('/support-tickets/add-comments/:id', jwtMiddleWare, supportTickerController.addCommentToTicket);
router.put('/support-tickets/change-status/:id', jwtMiddleWare, supportTickerController.changeTicketStatus);
router.put('/support-tickets/assign-agent/:id', jwtMiddleWare, supportTickerController.assignToAgent);
router.delete('/support-tickets/:id', jwtMiddleWare, supportTickerController.deleteTicket)

router.get('/agents', jwtMiddleWare, agentController.fetchAllAgents);
router.post('/agents', jwtMiddleWare, agentController.addAgent);

router.put('/agents/password-change/:id', jwtMiddleWare, userController.resetPassword);
router.put('/agents/update-permissions/:id', jwtMiddleWare, userController.updatePermissions);
router.delete('/agents/delete/:id', jwtMiddleWare, userController.deleteUser);

module.exports = router;