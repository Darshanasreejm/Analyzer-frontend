# 🚀 Quick Setup Guide

## Step 1: Install Dependencies
```bash
cd student-attendance-analyzer
npm install
```

## Step 2: Start Development Server
```bash
npm run dev
```

## Step 3: Open in Browser
Navigate to `http://localhost:3000`

## Step 4: Try Demo Logins

### Option 1: Click Demo Buttons
- Click "Demo Login as Student" or "Demo Login as Faculty"

### Option 2: Manual Login
**Student:**
- Email: alex.kumar@student.edu
- Password: password123

**Faculty:**
- Email: sarah.johnson@university.edu
- Password: password123

## 📱 What to Try

### As Student:
1. View your attendance dashboard
2. Check your motivation badge (🟢 Consistent Learner)
3. Explore subject-wise breakdown
4. View attendance distribution pie chart
5. Filter recent records (week/month/all)

### As Faculty:
1. View analytics overview with charts
2. Check daily trends (30-day line chart)
3. Analyze subject-wise heatmap
4. Review student rankings leaderboard
5. Go to "Mark Attendance" tab
6. Select subject and date
7. Mark students as Present/Late/Absent
8. Submit attendance
9. Go to "Predictions" tab
10. View at-risk students
11. Generate weekly/monthly reports

## 🎨 Features to Explore

- **Motivation Badges**: 3 levels based on attendance %
- **Interactive Charts**: Hover over data points
- **Color Coding**: Green/Yellow/Red status indicators
- **Responsive Design**: Try on different screen sizes
- **Prediction Engine**: See at-risk student analysis
- **Smart Reminders**: Notification system for declining trends

## 📊 Sample Data

The app comes pre-loaded with:
- 8 students with different attendance patterns
- 5 subjects (Data Structures, Database, Web Dev, ML, Software Engineering)
- 60 days of attendance records
- Realistic distribution based on student performance

## 🔧 Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 💡 Tips

1. **Mock Data**: All data is simulated - perfect for demo/testing
2. **No Backend Needed**: Everything runs in the browser
3. **Try Different Roles**: Logout and login as different roles
4. **Check Console**: Reports and data are logged to console
5. **Responsive**: Resize browser to see mobile layout

## 🐛 Common Issues

**Port 3000 already in use?**
Edit `vite.config.js` and change the port number.

**Charts not showing?**
Make sure all dependencies installed: `npm install`

**Page is blank?**
Check browser console for errors. Try clearing cache.

## 📚 Project Structure

```
src/
├── components/       # All React components
├── services/         # Mock data & business logic
├── styles.css        # Global styles
├── App.jsx          # Main app
└── main.jsx         # Entry point
```

## 🎯 Next Steps

To add real backend:
1. Set up MongoDB database
2. Create Express.js API server
3. Implement JWT authentication
4. Connect frontend to backend APIs
5. Add data persistence

For now, enjoy exploring the fully functional frontend! 🎉
