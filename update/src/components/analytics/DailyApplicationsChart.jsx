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
          // Display value for stacking (difference)
          displayApplications: Math.max(0, totalApps - uniqueCompanies),
          // Actual total for tooltip
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

  // Custom gradient definitions
  const gradients = {
    uniqueCompanies: {
      main: '#10B981',
      light: '#059669'
    },
    totalApplications: {
      main: '#6366F1',
      light: '#4F46E5'
    },
    rejections: {
      main: '#F43F5E',
      light: '#E11D48'
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-xl p-8 shadow-xl">
      <div className="flex flex-col space-y-6">
        {/* Header and Controls */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Daily Application Analysis
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1 shadow-inner">
              {dateRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => {
                    console.log(`Selecting range: ${range.value} days`);
                    setSelectedRange(range.value);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                    ${selectedRange === range.value
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { 
              label: 'Total Applications', 
              value: statistics.totalApplications,
              gradient: 'from-indigo-500 to-indigo-600'
            },
            { 
              label: 'Unique Companies', 
              value: statistics.uniqueCompanies,
              gradient: 'from-emerald-500 to-emerald-600'
            },
            { 
              label: 'Rejections', 
              value: statistics.rejections,
              gradient: 'from-rose-500 to-rose-600'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-96 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={filteredData}>
              <defs>
                {Object.entries(gradients).map(([key, colors]) => (
                  <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.main} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colors.light} stopOpacity={0.3}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#374151" 
                strokeOpacity={0.4}
              />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(date) => {
                  const utcDate = new Date(date);
                  utcDate.setUTCHours(0, 0, 0, 0);
                  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                  return new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    timeZone: userTimezone
                  }).format(utcDate);
                }}
                tickLine={{ stroke: '#4B5563' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#4B5563' }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid #374151',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
                labelStyle={{ color: '#E5E7EB', fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ color: '#9CA3AF', padding: '4px 0' }}
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                formatter={(value, name, props) => {
                  // Show total applications instead of the display value
                  if (name === "Total Applications") {
                    return [props.payload.totalApplications, name];
                  }
                  return [value, name];
                }}
                labelFormatter={(date) => {
                  const utcDate = new Date(date);
                  utcDate.setUTCHours(0, 0, 0, 0);
                  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                  return new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: userTimezone
                  }).format(utcDate);
                }}
              />
              <Legend 
                wrapperStyle={{
                  padding: '20px 0',
                }}
                formatter={(value) => (
                  <span style={{ color: '#D1D5DB', fontSize: '14px' }}>{value}</span>
                )}
              />
              
              <Bar 
                dataKey="uniqueCompanies" 
                name="Unique Companies" 
                stackId="apps"
                fill="url(#gradient-uniqueCompanies)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
              <Bar 
                dataKey="displayApplications" 
                name="Total Applications" 
                stackId="apps"
                fill="url(#gradient-totalApplications)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="rejections"
                name="Rejections"
                stroke={gradients.rejections.main}
                strokeWidth={3}
                dot={{ 
                  r: 4, 
                  fill: gradients.rejections.main,
                  strokeWidth: 2
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                  fill: gradients.rejections.light
                }}
                animationDuration={1500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyApplicationsChart;