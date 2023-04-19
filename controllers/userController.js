const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle user registration
exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with that email already exists' });
    }

    // Create new user
    const user = new User({ email, password, firstName, lastName });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// Handle user authentication
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Handle user profile update
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName } = req.body;

    // Update user profile
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Handle user deletion
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
