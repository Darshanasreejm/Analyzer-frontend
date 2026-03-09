import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import MotivationBadge from './MotivationBadge';
import { getStudentAttendance, mockUsers } from '../services/mockData';

const StudentDashboard = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    const data = getStudentAttendance(mockUsers.student.id);
    setAttendanceData(data);
  }, []);

  if (!attendanceData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const { overallStats, subjectWiseStats, records } = attendanceData;

  const pieData = [
    { name: 'Present', value: overallStats.present, color: '#10b981' },
    { name: 'Late', value: overallStats.late, color: '#f59e0b' },
    { name: 'Absent', value: overallStats.absent, color: '#ef4444' }
  ];

  const filteredRecords = selectedPeriod === 'week'
    ? records.slice(0, 7)
    : selectedPeriod === 'month'
      ? records.slice(0, 30)
      : records;

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
        My Attendance Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card info fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-header">
            <span className="stat-label">Total Classes</span>
            <span className="stat-icon">
              <Calendar size={20} />
            </span>
          </div>
          <div className="stat-value">{overallStats.total}</div>
          <div className="stat-description">Conducted this semester</div>
        </div>

        <div className="stat-card success fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-header">
            <span className="stat-label">Present</span>
            <span className="stat-icon">
              <CheckCircle size={20} />
            </span>
          </div>
          <div className="stat-value">{overallStats.present}</div>
          <div className="stat-description">Classes attended</div>
        </div>

        <div className="stat-card warning fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-header">
            <span className="stat-label">Late</span>
            <span className="stat-icon">
              <Clock size={20} />
            </span>
          </div>
          <div className="stat-value">{overallStats.late}</div>
          <div className="stat-description">Came late</div>
        </div>

        <div className="stat-card danger fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="stat-header">
            <span className="stat-label">Absent</span>
            <span className="stat-icon">
              <XCircle size={20} />
            </span>
          </div>
          <div className="stat-value">{overallStats.absent}</div>
          <div className="stat-description">Classes missed</div>
        </div>
      </div>

      {/* Motivation Badge and Pie Chart */}
      <div className="grid grid-2 mb-2">
        <MotivationBadge
          badge={mockUsers.student.motivationBadge}
          percentage={overallStats.percentage}
        />

        <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <h2 className="card-title">Attendance Distribution</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ fontSize: '0.95rem', fontWeight: 600 }}
                  formatter={(value, name) => [`${value} Classes`, name]}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject-wise Stats */}
      <div className="card mb-2 fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="card-header">
          <h2 className="card-title">
            <BookOpen size={22} className="text-primary" />
            <span>Subject-wise Attendance</span>
          </h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th className="text-center">Present</th>
                <th className="text-center">Absent</th>
                <th className="text-center">Late</th>
                <th className="text-center">Total</th>
                <th className="text-center">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {subjectWiseStats.map((subject, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{subject.code}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {subject.subject}
                    </div>
                  </td>
                  <td className="text-center" style={{ color: '#10b981', fontWeight: 600 }}>
                    {subject.present}
                  </td>
                  <td className="text-center" style={{ color: '#ef4444', fontWeight: 600 }}>
                    {subject.absent}
                  </td>
                  <td className="text-center" style={{ color: '#f59e0b', fontWeight: 600 }}>
                    {subject.late}
                  </td>
                  <td className="text-center" style={{ fontWeight: 600 }}>
                    {subject.total}
                  </td>
                  <td className="text-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: subject.percentage >= 90 ? '#d1fae5' :
                          subject.percentage >= 75 ? '#e0e7ff' :
                            subject.percentage >= 60 ? '#fef3c7' : '#fee2e2',
                        color: subject.percentage >= 90 ? '#059669' :
                          subject.percentage >= 75 ? '#4338ca' :
                            subject.percentage >= 60 ? '#d97706' : '#dc2626',
                        border: `1px solid ${subject.percentage >= 90 ? '#a7f3d0' :
                            subject.percentage >= 75 ? '#c7d2fe' :
                              subject.percentage >= 60 ? '#fde68a' : '#fecaca'
                          }`
                      }}>
                      {subject.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="card-title">
            <Calendar size={22} className="text-primary" />
            <span>Recent Attendance Records</span>
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select
              className="form-select"
              style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: 'auto' }}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th className="text-center">Status</th>
                <th>Marked By</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.slice(0, 20).map((record, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: '500' }}>
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{record.subjectCode}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {record.subjectName}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge badge-${record.status}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.95rem' }}>{record.markedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
