// payment.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get all payments for a project
router.get('/:projectId/payments', paymentController.getAllPaymentsForProject);

// Create a new payment for a project
router.post('/:projectId/payments', paymentController.createPaymentForProject);

// Get a payment by ID
router.get('/:projectId/payments/:paymentId', paymentController.getPaymentById);

module.exports = router;

