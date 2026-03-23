const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// @route   GET /api/attendance/student/:studentId
// @desc    Get attendance records for a student
// @access  Public (in real app, should be Private and checked against requesting user's ID)
router.get('/student/:studentId', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ studentId: req.params.studentId }).sort({ date: -1 });

        // We also want to compute some overview statistics (total present, absent, etc)
        const totalClasses = attendanceRecords.length;
        const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
        const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
        const lateCount = attendanceRecords.filter(record => record.status === 'Late').length;

        let attendancePercentage = 0;
        if (totalClasses > 0) {
            // Typically Late counts as present or half present, assuming simple present/total here:
            attendancePercentage = Math.round(((presentCount + (lateCount * 0.5)) / totalClasses) * 100);
        }

        res.json({
            records: attendanceRecords,
            summary: {
                totalClasses,
                presentCount,
                absentCount,
                lateCount,
                percentage: attendancePercentage
            }
        });

    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Server error fetching attendance details' });
    }
});

// @route   POST /api/attendance/mark-qr
// @desc    Mark attendance via QR code scan
// @access  Public (in real app, should be Private)
router.post('/mark-qr', async (req, res) => {
    const { studentId, subject } = req.body;

    if (!studentId || !subject) {
        return res.status(400).json({ message: 'Student ID and subject are required' });
    }

    try {
        // Prevent duplicate attendance for the same day (simplified check)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const existingRecord = await Attendance.findOne({
            studentId,
            subject,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance already marked for today in this subject' });
        }

        const newRecord = new Attendance({
            studentId,
            subject,
            status: 'Present' // QR scan implies presence
        });

        await newRecord.save();
        res.json({ message: 'Attendance marked successfully', record: newRecord });

    } catch (error) {
        console.error('Error marking QR attendance:', error);
        res.status(500).json({ message: 'Server error marking attendance' });
    }
});

module.exports = router;
