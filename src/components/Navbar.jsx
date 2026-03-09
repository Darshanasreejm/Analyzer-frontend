import React from 'react';
import { BookOpen, LogOut, User } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar fade-in">
      <div className="navbar-content">
        <div className="navbar-brand">
          <BookOpen strokeWidth={2} size={28} />
          <span>Attendance Analyzer</span>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-role">
              {user.role === 'student' ? 'Student' : 'Faculty'}
            </span>
            <span className="user-name">{user.name}</span>
          </div>
          <button className="btn btn-logout" onClick={onLogout}>
            <LogOut size={16} strokeWidth={2} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
