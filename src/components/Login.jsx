import React, { useState } from 'react';
import { GraduationCap, User, Lock, BookOpen } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending email and password as query parameters in a GET request to the backend.
      // (Note: For security reasons, POST is generally recommended for sending passwords, but using GET as requested.)
      const response = await fetch(`http://localhost:5000/api/login?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Pass the entire user data to the parent component
        onLogin(data);
      } else {
        alert(data.message || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to the server. Please ensure the backend is running.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo fade-in">
            <BookOpen size={48} strokeWidth={1.5} />
          </div>
          <h1 className="login-title fade-in" style={{ animationDelay: '0.1s' }}>Attendance Analyzer</h1>
          <p className="login-subtitle fade-in" style={{ animationDelay: '0.2s' }}>Track, Analyze & Improve Attendance</p>
        </div>

        <form onSubmit={handleSubmit} className="fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="role-selector">
            <div
              className={`role-option ${selectedRole === 'student' ? 'active' : ''}`}
              onClick={() => setSelectedRole('student')}
            >
              <User size={28} strokeWidth={1.5} />
              <span>Student</span>
            </div>
            <div
              className={`role-option ${selectedRole === 'faculty' ? 'active' : ''}`}
              onClick={() => setSelectedRole('faculty')}
            >
              <GraduationCap size={28} strokeWidth={1.5} />
              <span>Faculty</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}>
            <Lock size={18} />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
