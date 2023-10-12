const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getByUsername);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.put('/update', userController.updateUser);

module.exports = router;