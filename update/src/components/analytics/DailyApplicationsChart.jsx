import React, { useState, useMemo, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DailyApplicationsChart = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState(7);
  const [processedData, setProcessedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const dateRanges = [
    { label: '7D', value: 7 },
    { label: '14D', value: 14 },
    { label: '30D', value: 30 },
    { label: '60D', value: 60 },
    { label: 'All', value: 'all' }
  ];

  // Process all data first
  useEffect(() => {
    const processed = Object.entries(data)
      .map(([date, stats]) => {
        const uniqueCompanies = stats.uniqueCompanies.size;
        const totalApps = stats.totalApplications;
        
        return {
          date,
          uniqueCompanies,
          additionalApps: Math.max(0, totalApps - uniqueCompanies),
          totalApplications: totalApps,
          rejections: stats.rejections
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setProcessedData(processed);
  }, [data]);

  // Filter data based on selected range
  useEffect(() => {
    if (!processedData.length) return;
    
    const filtered = selectedRange === 'all' 
      ? processedData 
      : processedData.slice(-selectedRange);
      
    setFilteredData(filtered);
    
    console.log(`Showing ${filtered.length} days of data`);
    if (filtered.length > 0) {
      console.log(`Date range: ${filtered[0].date} to ${filtered[filtered.length-1].date}`);
    }
  }, [selectedRange, processedData]);

  // Calculate statistics for the filtered range
  const statistics = useMemo(() => {
    return filteredData.reduce((acc, day) => ({
      totalApplications: acc.totalApplications + day.totalApplications,
      uniqueCompanies: acc.uniqueCompanies + day.uniqueCompanies,
      rejections: acc.rejections + day.rejections
    }), { totalApplications: 0, uniqueCompanies: 0, rejections: 0 });
  }, [filteredData]);

  return (
    <div className="w-full bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col space-y-4">
        {/* Header and Controls */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Daily Application Analysis</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-700 rounded-lg p-1">
              {dateRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => {
                    console.log(`Selecting range: ${range.value} days`);
                    setSelectedRange(range.value);
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                    ${selectedRange === range.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { 
              label: 'Total Applications', 
              value: statistics.totalApplications,
              color: 'bg-blue-600'
            },
            { 
              label: 'Unique Companies', 
              value: statistics.uniqueCompanies,
              color: 'bg-green-600'
            },
            { 
              label: 'Rejections', 
              value: statistics.rejections,
              color: 'bg-red-600'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="text-gray-400 text-sm">{stat.label}</div>
              <div className={`text-2xl font-bold ${stat.color} bg-opacity-20 mt-2 p-2 rounded`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-96 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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
                formatter={(value, name) => {
                  if (name === "Total Applications") {
                    return [value, name];
                  }
                  return [value, name];
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Legend />
              
              {/* Stacked bars for applications */}
              <Bar 
                dataKey="uniqueCompanies" 
                name="Unique Companies" 
                stackId="apps"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="totalApplications" 
                name="Total Applications" 
                stackId="apps"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              
              {/* Line for rejections */}
              <Line
                type="monotone"
                dataKey="rejections"
                name="Rejections"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyApplicationsChart;