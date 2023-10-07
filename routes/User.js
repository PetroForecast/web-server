const express = require('express');
router = express.Router();

const controller = require('../controllers/UserController');

router.get('', controller.getAllUsers);


module.exports = router;