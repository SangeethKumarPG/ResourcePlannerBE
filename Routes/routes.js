const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');

const jwtMiddleWare = require('../MiddleWares/jwtMiddleWare');

router.post('/login', userController.login);




module.exports = router;