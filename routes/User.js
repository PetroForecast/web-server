const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;