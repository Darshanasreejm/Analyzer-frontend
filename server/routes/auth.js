const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/login
// @desc    Authenticate user and get role
// @access  Public
router.get('/login', async (req, res) => {
    const { email, password } = req.query;
 
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // In a real application, passwords should be hashed using bcrypt.
        // For this demonstration, we'll use simple plain-text comparison.
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return successful response with basic user information
        res.json({
            message: 'Login successful',
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
