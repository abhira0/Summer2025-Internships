
// src/components/analytics/SalaryDistributionChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function SalaryDistributionChart ({ data }) {
  const chartData = Object.entries(data).map(([range, count]) => ({
    range,
    count
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="range" 
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
          <Bar dataKey="count" fill="#3B82F6" name="Number of Positions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
