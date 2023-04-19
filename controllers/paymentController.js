const Payment = require('../models/paymentModel');

// Create a payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all payments for a user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ userId });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
