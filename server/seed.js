require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully for seeding...');

        // Clear existing data
        await User.deleteMany({});
        console.log('Cleared existing users collection.');

        // Seed Admin
        const adminData = [
            {
                name: 'System Administrator',
                email: 'admin@college.edu',
                password: 'adminpassword',
                role: 'admin'
            }
        ];

        // Seed Faculty
        const facultyData = [
            {
                name: 'Dr. Alan Smith',
                email: 'alan.smith@college.edu',
                password: 'password123',
                role: 'faculty',
                department: 'MECH',
                designation: 'Professor',
                facultyId: 'FAC001'
            },
            {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@college.edu',
                password: 'password123',
                role: 'faculty',
                department: 'MTRS',
                designation: 'Associate Professor',
                facultyId: 'FAC002'
            },
            {
                name: 'Prof. Michael Chen',
                email: 'michael.chen@college.edu',
                password: 'password123',
                role: 'faculty',
                department: 'MECH',
                designation: 'Assistant Professor',
                facultyId: 'FAC003'
            },
            {
                name: 'Dr. Emily White',
                email: 'emily.white@college.edu',
                password: 'password123',
                role: 'faculty',
                department: 'MTRS',
                designation: 'Professor',
                facultyId: 'FAC004'
            }
        ];

        // Seed Students
        const studentData = [
            {
                name: 'Ritish',
                email: 'ritish@student.edu',
                password: 'studentpassword',
                role: 'student',
                rollNumber: 'MECH001',
                department: 'MECH',
                semester: '4',
                section: 'A'
            },
            {
                name: 'Darshana Sree',
                email: 'darshana@student.edu',
                password: 'studentpassword',
                role: 'student',
                rollNumber: 'MTRS001',
                department: 'MTRS',
                semester: '4',
                section: 'B'
            },
            {
                name: 'Arjun Kumar',
                email: 'arjun@student.edu',
                password: 'studentpassword',
                role: 'student',
                rollNumber: 'MECH002',
                department: 'MECH',
                semester: '4',
                section: 'A'
            },
            {
                name: 'Priya Sharma',
                email: 'priya@student.edu',
                password: 'studentpassword',
                role: 'student',
                rollNumber: 'MTRS002',
                department: 'MTRS',
                semester: '4',
                section: 'A'
            },
            {
                name: 'Karthik Nair',
                email: 'karthik@student.edu',
                password: 'studentpassword',
                role: 'student',
                rollNumber: 'MECH003',
                department: 'MECH',
                semester: '4',
                section: 'B'
            }
        ];

        // Combine and insert
        await User.insertMany([...adminData, ...facultyData, ...studentData]);
        console.log('Successfully seeded 1 admin, 4 faculty and 5 students into Atlas DB!');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
