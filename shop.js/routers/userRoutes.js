const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/register', userController.renderRegister);
router.get('/login', userController.renderLogin);

module.exports = router;
