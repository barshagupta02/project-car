const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const protect = async (req, res, next) => {
  try {
    //handle bearer or without bearer
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded", decoded);

    // Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Grant access
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { protect };
