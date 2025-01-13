import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SalaryDistributionChart = ({ data }) => {
  const chartData = Object.entries(data.hourly).map(([range, count]) => ({
    range,
    hourly: count,
    all: data.all[range]
  }));

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Salary Distribution</h2>
      <div className="h-96">
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
            <Legend />
            <Bar 
              dataKey="hourly" 
              name={`Non-Yearly Jobs (${data.hourlyTotal} jobs)`}
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="all" 
              name={`All Pay Periods (${data.allTotal} jobs)`}
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryDistributionChart;