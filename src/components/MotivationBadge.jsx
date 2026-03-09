import React from 'react';
import { Award, TrendingUp, AlertTriangle } from 'lucide-react';

const MotivationBadge = ({ badge, percentage, size = 'normal' }) => {
  const getBadgeConfig = () => {
    switch (badge) {
      case 'consistent-learner':
        return {
          icon: Award,
          text: 'Consistent Learner',
          className: 'badge-consistent',
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.1)',
          message: 'Excellent attendance! Keep it up!'
        };
      case 'needs-improvement':
        return {
          icon: TrendingUp,
          text: 'Needs Improvement',
          className: 'badge-improvement',
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.1)',
          message: 'Good effort! A little more consistency needed.'
        };
      case 'at-risk':
        return {
          icon: AlertTriangle,
          text: 'At Risk',
          className: 'badge-risk',
          color: '#ef4444',
          bg: 'rgba(239, 68, 68, 0.1)',
          message: 'Critical! Please improve your attendance.'
        };
      default:
        return {
          icon: Award,
          text: 'No Badge',
          className: 'badge-improvement',
          color: '#6366f1',
          bg: 'rgba(99, 102, 241, 0.1)',
          message: 'Start attending classes to earn a badge!'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  if (size === 'small') {
    return (
      <span className={`badge ${config.className}`}>
        {config.text}
      </span>
    );
  }

  return (
    <div className="card fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2.5rem 1.5rem',
      animationDelay: '0.2s'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: config.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        boxShadow: `0 0 20px ${config.bg}`
      }}>
        <Icon size={40} color={config.color} strokeWidth={1.5} />
      </div>

      <div className={`badge ${config.className}`} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        {config.text}
      </div>

      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '2rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '0.25rem'
      }}>
        {percentage}%
      </div>

      <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
        Overall Attendance
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem',
        color: '#475569',
        fontSize: '0.875rem',
        border: '1px solid #e2e8f0',
        width: '100%'
      }}>
        {config.message}
      </div>
    </div>
  );
};

export default MotivationBadge;
