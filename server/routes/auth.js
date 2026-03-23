const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route   GET /api/login
// @desc    Authenticate user and get role
// @access  Public
router.get('/login', async (req, res) => {
    const { email, password } = req.query;
 
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // --- MOCK ADMIN BYPASS ---
    // If the DB seed failed, we still want the user to be able to test the Admin dashboard
    if (email === 'admin@college.edu' && password === 'adminpassword') {
        const token = jwt.sign(
            { userId: 'admin-mock-id', role: 'admin', email: 'admin@college.edu' },
            process.env.JWT_SECRET || 'fallback_secret_key_for_dev',
            { expiresIn: '24h' }
        );
        return res.json({
            message: 'Mock Admin Login successful',
            token,
            userId: 'admin-mock-id',
            name: 'System Administrator',
            email: 'admin@college.edu',
            role: 'admin'
        });
    }
    // -------------------------

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // In a real application, passwords should be hashed using bcrypt.
        // For this demonstration, we'll use simple plain-text comparison.
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key_for_dev',
            { expiresIn: '24h' }
        );

        // Return successful response with basic user information
        res.json({
            message: 'Login successful',
            token,
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
