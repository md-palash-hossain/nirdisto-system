const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API routes for the User model
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
