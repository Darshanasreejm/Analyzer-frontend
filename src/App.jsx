import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);

  // The Login component fetch now needs to return the full user profile data 
  // and pass it here instead of just the role string.
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        {user.role === 'student' ? (
          <StudentDashboard />
        ) : (
          <FacultyDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
