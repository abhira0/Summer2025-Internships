import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DailyApplicationsChart = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState(7);
  
  // Transform data for chart
  const chartData = Object.entries(data).map(([date, stats]) => ({
    date,
    applications: stats.totalApplications,
    companies: stats.uniqueCompanies.size,
    rejections: stats.rejections
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  const dateRanges = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 14 Days', value: 14 },
    { label: 'Last 30 Days', value: 30 },
    { label: 'Last 2 Months', value: 60 },
    { label: 'All Time', value: 'all' }
  ];

  const filteredData = selectedRange === 'all' 
    ? chartData 
    : chartData.slice(-selectedRange);

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Daily Application Analysis</h2>
        <div className="flex gap-2">
          {dateRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedRange === range.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData}>
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
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            <Bar 
              dataKey="applications" 
              name="Total Applications" 
              fill="#3B82F6"
              stackId="stack"
            />
            <Bar 
              dataKey="companies" 
              name="Unique Companies" 
              fill="#10B981"
              stackId="stack"
            />
            <Line
              type="monotone"
              dataKey="rejections"
              name="Rejections"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyApplicationsChart;