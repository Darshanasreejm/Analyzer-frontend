const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Present'
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Might be a faculty ID or an automated system
    }
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
