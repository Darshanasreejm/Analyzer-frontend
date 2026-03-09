import React, { useState, useEffect } from 'react';
import { Users, Calendar, BarChart3, Download, AlertCircle } from 'lucide-react';
import DailyTrendsChart from './DailyTrendsChart';
import SubjectHeatmap from './SubjectHeatmap';
import StudentRankings from './StudentRankings';
import PredictionModule from './PredictionModule';
import {
  getDailyTrends,
  getSubjectHeatmap,
  getStudentRankings,
  predictAtRiskStudents,
  generateReport,
  mockSubjects,
  mockStudents
} from '../services/mockData';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMarks, setAttendanceMarks] = useState({});

  const dailyTrends = getDailyTrends(30);
  const subjectHeatmap = getSubjectHeatmap();
  const studentRankings = getStudentRankings();
  const predictions = predictAtRiskStudents();

  // Initialize attendance marks
  useEffect(() => {
    const marks = {};
    mockStudents.forEach(student => {
      marks[student.id] = 'present';
    });
    setAttendanceMarks(marks);
  }, []);

  const handleMarkAttendance = (studentId, status) => {
    setAttendanceMarks(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    // In real app, this would send to backend
    alert('Attendance marked successfully!');
    console.log('Attendance data:', {
      subject: selectedSubject,
      date: selectedDate,
      marks: attendanceMarks
    });
  };

  const handleGenerateReport = (type) => {
    const report = generateReport(type);
    console.log(`${type} report:`, report);
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated! Check console for details.`);
  };

  const totalPresent = Object.values(attendanceMarks).filter(m => m === 'present').length;
  const totalAbsent = Object.values(attendanceMarks).filter(m => m === 'absent').length;
  const totalLate = Object.values(attendanceMarks).filter(m => m === 'late').length;

  return (
    <div className="fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
          Faculty Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => handleGenerateReport('weekly')}
          >
            <Download size={18} />
            Weekly Report
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleGenerateReport('monthly')}
          >
            <Download size={18} />
            Monthly Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'overview' ? '3px solid #6366f1' : '3px solid transparent',
            color: activeTab === 'overview' ? '#6366f1' : '#64748b',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BarChart3 size={18} />
          Analytics Overview
        </button>
        <button
          onClick={() => setActiveTab('mark')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'mark' ? '3px solid #6366f1' : '3px solid transparent',
            color: activeTab === 'mark' ? '#6366f1' : '#64748b',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Calendar size={18} />
          Mark Attendance
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'predictions' ? '3px solid #6366f1' : '3px solid transparent',
            color: activeTab === 'predictions' ? '#6366f1' : '#64748b',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={18} />
          Predictions
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="fade-in">
          {/* Stats Summary */}
          <div className="stats-grid">
            <div className="stat-card info fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="stat-header">
                <span className="stat-label">Total Students</span>
                <span className="stat-icon">
                  <Users size={20} />
                </span>
              </div>
              <div className="stat-value">{mockStudents.length}</div>
              <div className="stat-description">Enrolled students</div>
            </div>

            <div className="stat-card success fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="stat-header">
                <span className="stat-label">Average Attendance</span>
                <span className="stat-icon">
                  <BarChart3 size={20} />
                </span>
              </div>
              <div className="stat-value">
                {(mockStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / mockStudents.length).toFixed(1)}%
              </div>
              <div className="stat-description">Class average</div>
            </div>

            <div className="stat-card danger fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="stat-header">
                <span className="stat-label">At Risk Students</span>
                <span className="stat-icon">
                  <AlertCircle size={20} />
                </span>
              </div>
              <div className="stat-value">{predictions.length}</div>
              <div className="stat-description">Need attention</div>
            </div>

            <div className="stat-card warning fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="stat-header">
                <span className="stat-label">Subjects</span>
                <span className="stat-icon">
                  <Calendar size={20} />
                </span>
              </div>
              <div className="stat-value">{mockSubjects.length}</div>
              <div className="stat-description">Active courses</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-2 mb-2">
            <DailyTrendsChart data={dailyTrends} />
            <SubjectHeatmap data={subjectHeatmap} />
          </div>

          {/* Rankings */}
          <StudentRankings students={studentRankings} />
        </div>
      )}

      {/* Mark Attendance Tab */}
      {activeTab === 'mark' && (
        <div className="fade-in">
          <div className="card mb-2">
            <div className="card-header">
              <h2 className="card-title">
                <Calendar size={22} className="text-primary" />
                <span>Mark Attendance</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="form-group mb-0">
                <label className="form-label" style={{ fontWeight: 600, color: '#334155' }}>Select Subject</label>
                <select
                  className="form-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {mockSubjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label" style={{ fontWeight: 600, color: '#334155' }}>Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: 500 }}>Present</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#10b981' }}>{totalPresent}</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: 500 }}>Late</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#f59e0b' }}>{totalLate}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: 500 }}>Absent</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#ef4444' }}>{totalAbsent}</div>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th style={{ textAlign: 'center' }}>Current %</th>
                    <th style={{ textAlign: 'center' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map(student => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{student.rollNumber}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{student.name}</div>
                      </td>
                      <td className="text-center">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: student.attendancePercentage >= 90 ? '#d1fae5' :
                              student.attendancePercentage >= 60 ? '#fef3c7' : '#fee2e2',
                            color: student.attendancePercentage >= 90 ? '#059669' :
                              student.attendancePercentage >= 60 ? '#d97706' : '#dc2626',
                            border: `1px solid ${student.attendancePercentage >= 90 ? '#a7f3d0' :
                                student.attendancePercentage >= 60 ? '#fde68a' : '#fecaca'
                              }`
                          }}>
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'present' ? 'btn-success' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'present' ? '#10b981' : 'transparent',
                              color: attendanceMarks[student.id] === 'present' ? 'white' : '#10b981',
                              border: `1px solid #10b981`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                          >
                            Present
                          </button>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'late' ? 'btn-warning' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'late' ? '#f59e0b' : 'transparent',
                              color: attendanceMarks[student.id] === 'late' ? 'white' : '#f59e0b',
                              border: `1px solid #f59e0b`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                          >
                            Late
                          </button>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'absent' ? 'btn-danger' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'absent' ? '#ef4444' : 'transparent',
                              color: attendanceMarks[student.id] === 'absent' ? 'white' : '#ef4444',
                              border: `1px solid #ef4444`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                className="btn btn-primary"
                style={{ padding: '1rem 3rem', fontSize: '1rem' }}
                onClick={handleSubmitAttendance}
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="fade-in">
          <PredictionModule predictions={predictions} />
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
