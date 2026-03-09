import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import MotivationBadge from './MotivationBadge';

const StudentRankings = ({ students }) => {
  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy size={24} color="#f59e0b" />;
    if (rank === 2) return <Medal size={24} color="#94a3b8" />;
    if (rank === 3) return <Award size={24} color="#b45309" />;
    return <span style={{ width: '24px', textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>{rank}</span>;
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="card-header">
        <h2 className="card-title">
          <Trophy size={22} className="text-primary" />
          <span>Student Consistency Rankings</span>
        </h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="text-center" style={{ width: '80px' }}>Rank</th>
              <th>Student Details</th>
              <th className="text-center">Attendance</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="text-center">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {getMedalIcon(index + 1)}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                    {student.rollNumber}
                  </div>
                </td>
                <td className="text-center">
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: student.attendancePercentage >= 90 ? '#10b981' :
                      student.attendancePercentage >= 60 ? '#f59e0b' : '#ef4444'
                  }}>
                    {student.attendancePercentage}%
                  </div>
                </td>
                <td className="text-center">
                  <MotivationBadge badge={student.motivationBadge} size="small" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0',
        fontSize: '0.875rem'
      }}>
        <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.75rem' }}>Badge Criteria:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Consistent Learner: ≥90%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            Needs Improvement: 60-89%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            At Risk: &lt;60%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRankings;
