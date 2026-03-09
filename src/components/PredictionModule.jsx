import React from 'react';
import { AlertTriangle, TrendingDown, Bell, TrendingUp, Minus } from 'lucide-react';

const PredictionModule = ({ predictions }) => {
  const getRiskColor = (level) => {
    return level === 'high' ? '#ef4444' : '#f59e0b';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'declining') return <TrendingDown size={18} color="#ef4444" />;
    if (trend === 'stable') return <Minus size={18} color="#f59e0b" />;
    return <TrendingUp size={18} color="#10b981" />;
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="card-title">
          <AlertTriangle size={22} className="text-primary" />
          <span>At-Risk Student Predictions</span>
        </h2>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          <Bell size={16} />
          <span>Send Reminders</span>
        </button>
      </div>

      {predictions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          color: '#64748b',
          backgroundColor: '#f8fafc',
          borderRadius: '0.75rem',
          border: '1px dashed #cbd5e1'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>All Students Doing Well!</div>
          <div style={{ marginTop: '0.5rem' }}>No students at risk currently based on our predictive model.</div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th className="text-center">Current %</th>
                <th className="text-center">Recent Absences</th>
                <th className="text-center">Trend</th>
                <th className="text-center">Risk Level</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{pred.student}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {pred.rollNumber}
                    </div>
                  </td>
                  <td className="text-center">
                    <span style={{
                      fontWeight: '700',
                      color: pred.currentAttendance < 60 ? '#ef4444' : '#f59e0b',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1.125rem'
                    }}>
                      {pred.currentAttendance}%
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: pred.recentAbsences >= 3 ? '#fee2e2' : '#fef3c7',
                        color: pred.recentAbsences >= 3 ? '#dc2626' : '#d97706',
                        border: `1px solid ${pred.recentAbsences >= 3 ? '#fecaca' : '#fde68a'}`
                      }}>
                      {pred.recentAbsences} / 10
                    </span>
                  </td>
                  <td className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {getTrendIcon(pred.trend)}
                    </div>
                  </td>
                  <td className="text-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: `${getRiskColor(pred.riskLevel)}15`,
                        color: getRiskColor(pred.riskLevel),
                        border: `1px solid ${getRiskColor(pred.riskLevel)}30`
                      }}>
                      {pred.riskLevel}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
                      {pred.recommendation}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#fffbeb',
        borderRadius: '0.75rem',
        border: '1px solid #fde68a',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <div style={{
          padding: '0.5rem',
          backgroundColor: '#fef3c7',
          borderRadius: '50%',
          color: '#d97706'
        }}>
          <Bell size={20} strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '0.25rem' }}>
            Smart Reminder System
          </div>
          <div style={{ fontSize: '0.875rem', color: '#b45309', lineHeight: 1.5 }}>
            Students with declining trends will automatically receive personalized reminder notifications
            to help them improve their attendance patterns.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModule;
