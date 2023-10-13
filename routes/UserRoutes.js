const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getByUsername);
router.get('/check/:username', userController.isUsernameAvailable);
router.get('/quote-history/:username', userController.getQuoteHistoryByUsername);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.put('/update/:username', userController.updateUser);

module.exports = router;