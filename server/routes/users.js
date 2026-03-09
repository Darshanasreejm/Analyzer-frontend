const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error fetching user profile' });
    }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        // Only allow specific fields to be updated securely.
        // In a real application, ensure the user can only update their *own* profile.
        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.photo) updates.photo = req.body.photo;

        // Student specifics
        if (req.body.rollNumber) updates.rollNumber = req.body.rollNumber;
        if (req.body.department) updates.department = req.body.department;
        if (req.body.semester) updates.semester = req.body.semester;
        if (req.body.section) updates.section = req.body.section;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true } // Return updated document
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error updating user profile' });
    }
});

module.exports = router;
