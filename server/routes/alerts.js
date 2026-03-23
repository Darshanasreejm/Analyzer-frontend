const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');

// @route   POST /api/alerts/send
// @desc    Send an automated email alert to a student
// @access  Public (in real app, should be Private and checked against requested user's ID)
router.post('/send', async (req, res) => {
    const { studentId, message } = req.body;

    if (!studentId || !message) {
        return res.status(400).json({ message: 'Student ID and message are required' });
    }

    try {
        const student = await User.findById(studentId);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // --- Mocking Email Sending for Development ---
        console.log(`\n================= MOCK EMAIL SEND =================`);
        console.log(`To: ${student.email}`);
        console.log(`Subject: Important: Attendance Alert`);
        console.log(`Message: \n${message}`);
        console.log(`===================================================\n`);
        
        // Return success
        return res.json({ message: 'Alert sent successfully (mocked)' });

    } catch (error) {
        console.error('Error sending alert:', error);
        res.status(500).json({ message: 'Server error sending alert' });
    }
});

module.exports = router;
