// src/components/analytics/DailyApplicationsChart.jsx
import React, { useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart
} from 'recharts';

export default function DailyApplicationsChart ({ data }) {
  // Transform data into the format Recharts expects
  const chartData = Object.entries(data).map(([date, stats]) => ({
    date,
    applications: stats.totalApplications,
    companies: stats.uniqueCompanies.size,
    rejections: stats.rejections
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.375rem'
            }}
            labelStyle={{ color: '#9CA3AF' }}
            itemStyle={{ color: '#9CA3AF' }}
          />
          <Legend />
          <Bar dataKey="applications" fill="#3B82F6" name="Total Applications" />
          <Bar dataKey="companies" fill="#10B981" name="Unique Companies" />
          <Line 
            type="monotone" 
            dataKey="rejections" 
            stroke="#EF4444" 
            name="Rejections"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
