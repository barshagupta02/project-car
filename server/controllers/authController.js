const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const login = async (req, res) => {
  try {
    console.log("Body", req.body);
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Include password for verification
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 432000
    });

    // Respond with token
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

module.exports = { login };
