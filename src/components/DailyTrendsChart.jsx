import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const DailyTrendsChart = ({ data }) => {
  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <h2 className="card-title">
          <TrendingUp size={22} className="text-primary" />
          <span>Daily Trends</span>
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.5)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '1rem',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ fontSize: '0.875rem', fontWeight: 500, padding: '2px 0' }}
              labelStyle={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '1rem', fontSize: '0.875rem' }}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="present"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
              name="Present"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="late"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#d97706' }}
              name="Late"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="absent"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#dc2626' }}
              name="Absent"
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTrendsChart;
