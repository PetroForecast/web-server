const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getByUsername);
router.get('/check/:username', userController.isUsernameAvailable);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.put('/update', userController.updateUser);

module.exports = router;