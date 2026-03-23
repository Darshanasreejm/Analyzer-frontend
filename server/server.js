require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const attendanceRoutes = require('./routes/attendance');

app.use('/api', authRoutes); // login
app.use('/api/users', userRoutes); // profile fetch/update
app.use('/api/attendance', attendanceRoutes); // attendance records
app.use('/api/alerts', require('./routes/alerts')); // Mocked email alerts
app.use('/api/polls', require('./routes/polls')); // Live polling

app.get('/', (req, res) => {
    res.send('Attendance Analyzer API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
