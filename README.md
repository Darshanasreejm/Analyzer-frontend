# 🎓 Student Attendance Pattern Analyzer

A comprehensive full-stack MERN application for tracking, analyzing, and predicting student attendance patterns with gamification features.

## ✨ Features

### 🔐 Authentication
- Faculty and Student login roles
- Mock authentication (ready for JWT integration)

### 👨‍🏫 Faculty Features
- **Mark Attendance**: Mark students as Present, Absent, or Late
- **Analytics Dashboard**:
  - Daily attendance trends (30-day line chart)
  - Subject-wise attendance heatmap with color-coded performance
  - Student consistency rankings with medals
- **Prediction Module**: Rule-based system to identify at-risk students
- **Reporting**: Generate weekly/monthly attendance summaries
- **Smart Reminders**: Notification system for students with declining trends

### 👨‍🎓 Student Features
- **Personal Dashboard**: View attendance statistics and history
- **Subject-wise Analysis**: Detailed breakdown by course
- **Attendance Distribution**: Visual pie chart representation
- **Recent Records**: Filterable attendance history (week/month/all)
- **Motivation Badge System**: Gamified attendance tracking

## 🎮 Novelty Feature: Motivation Index

The application includes a unique gamification system with three badge levels:

- 🟢 **Consistent Learner** (≥90% attendance)
  - Achievement badge with green theme
  - Message: "Excellent attendance! Keep it up!"

- 🟡 **Needs Improvement** (60-89% attendance)
  - Progress badge with yellow theme
  - Message: "Good effort! A little more consistency needed."

- 🔴 **At Risk** (<60% attendance)
  - Warning badge with red theme
  - Message: "Critical! Please improve your attendance."

Badges are displayed prominently on student profiles and update automatically based on attendance percentage.

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Recharts 2.10** - Data visualization (charts & graphs)
- **Lucide React** - Modern icon library
- **Vite 5.0** - Fast build tool and dev server
- **Date-fns** - Date manipulation

### Backend (Ready for Integration)
- **MongoDB** - Database (schema designed)
- **Express.js** - API framework
- **Node.js** - Runtime environment
- **JWT** - Authentication tokens

## 📁 Project Structure

```
student-attendance-analyzer/
├── src/
│   ├── components/
│   │   ├── Login.jsx                 # Login page with role selection
│   │   ├── Navbar.jsx                # Top navigation bar
│   │   ├── StudentDashboard.jsx      # Student main dashboard
│   │   ├── FacultyDashboard.jsx      # Faculty main dashboard
│   │   ├── MotivationBadge.jsx       # Gamification badge component
│   │   ├── DailyTrendsChart.jsx      # Line chart for daily trends
│   │   ├── SubjectHeatmap.jsx        # Bar chart for subject analysis
│   │   ├── StudentRankings.jsx       # Leaderboard with rankings
│   │   └── PredictionModule.jsx      # At-risk student predictions
│   ├── services/
│   │   └── mockData.js               # Mock data generator & API simulation
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── styles.css                    # Global styles
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Access the Application**
- Open your browser to `http://localhost:3000`

### Demo Credentials

**Student Login:**
- Email: `alex.kumar@student.edu`
- Password: `password123`
- Or click "Demo Login as Student"

**Faculty Login:**
- Email: `sarah.johnson@university.edu`
- Password: `password123`
- Or click "Demo Login as Faculty"

## 📊 Data Flow

```
User Login → Role Detection → Dashboard Render
                ↓
Faculty: Mark Attendance → Store in Memory → Update Analytics
                ↓
Student: View Records → Calculate Stats → Display Badges
                ↓
Prediction Engine → Analyze Patterns → Flag At-Risk Students
                ↓
Reports → Aggregate Data → Generate Summaries
```

## 🎯 Key Components

### Mock Data Service (`mockData.js`)
- **8 Students** with varying attendance patterns
- **5 Subjects** across different courses
- **60 Days** of attendance records (excluding weekends)
- Realistic data distribution based on student performance levels

### Analytics Functions
- `getDailyTrends()` - Daily attendance aggregation
- `getSubjectHeatmap()` - Subject-wise statistics
- `getStudentRankings()` - Sorted by attendance percentage
- `predictAtRiskStudents()` - Rule-based risk assessment
- `generateReport()` - Weekly/monthly summaries

### Prediction Algorithm
```javascript
Risk Level = {
  HIGH: attendance < 60% OR recent absences >= 3
  MEDIUM: attendance < 75% OR recent absences >= 1
  LOW: attendance >= 75% AND recent absences < 1
}

Trend = {
  DECLINING: 3+ absences in last 10 classes
  STABLE: 1-2 absences in last 10 classes
  IMPROVING: 0 absences in last 10 classes
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-Coded Status**: Green (present), Yellow (late), Red (absent)
- **Interactive Charts**: Hover tooltips and legends
- **Smooth Animations**: Transitions and hover effects
- **Gradient Themes**: Modern purple-blue gradient design
- **Card-Based Layout**: Clean, organized information hierarchy

## 📈 Charts & Visualizations

1. **Daily Trends Line Chart**
   - Multi-line graph showing present/late/absent over 30 days
   - X-axis: Dates, Y-axis: Student count
   - Interactive tooltips

2. **Subject Heatmap**
   - Horizontal bar chart showing attendance rates
   - Color-coded: Green (≥90%), Blue (≥75%), Yellow (≥60%), Red (<60%)
   - Detailed table view below chart

3. **Attendance Distribution Pie Chart**
   - Shows proportion of present/late/absent
   - Percentage labels on each slice

## 🔮 Future Enhancements (Backend Integration)

### Ready for Implementation:
1. Connect to MongoDB database
2. Implement JWT authentication
3. Add real-time notifications
4. Email reminder system
5. CSV/PDF export functionality
6. Advanced ML predictions
7. Role-based access control
8. Audit logs

### API Endpoints (Designed, Not Implemented):
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me

POST   /api/attendance/mark
GET    /api/attendance/student/:id
GET    /api/attendance/subject/:id
GET    /api/attendance/my-attendance

GET    /api/analytics/daily-trends
GET    /api/analytics/subject-heatmap
GET    /api/analytics/rankings
GET    /api/analytics/predictions

GET    /api/reports/weekly
GET    /api/reports/monthly
```

## 🐛 Troubleshooting

**Issue: Charts not rendering**
- Ensure all dependencies are installed: `npm install`
- Clear browser cache and reload

**Issue: Data not updating**
- The current version uses static mock data
- Changes won't persist across page refreshes

**Issue: Port already in use**
- Change port in `vite.config.js` or kill the process using port 3000

## 📝 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🤝 Contributing

This is a demo project. For a production implementation:
1. Add MongoDB connection
2. Implement JWT authentication
3. Add input validation
4. Implement error handling
5. Add unit tests
6. Set up CI/CD pipeline

## 📄 License

MIT License - Feel free to use for educational purposes.

## 👨‍💻 Developer Notes

The application is designed with separation of concerns:
- **Components**: Pure UI components
- **Services**: Data fetching and business logic
- **Styles**: Global CSS with CSS variables for theming

All mock data is generated programmatically to simulate realistic patterns, making it easy to test various scenarios without a backend.

---

**Built with ❤️ for educational purposes**
