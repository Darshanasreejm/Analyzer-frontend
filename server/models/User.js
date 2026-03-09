const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student'
    },
    photo: {
        type: String,
        default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150'
    },
    // Student specific fields
    rollNumber: {
        type: String,
        unique: true,
        sparse: true // Allows nulls/undefined for faculty but enforces uniqueness for students
    },
    department: {
        type: String
    },
    semester: {
        type: String
    },
    section: {
        type: String
    },
    // Faculty specific fields
    designation: {
        type: String
    },
    facultyId: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
