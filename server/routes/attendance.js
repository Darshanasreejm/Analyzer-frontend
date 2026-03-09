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

module.exports = router;
