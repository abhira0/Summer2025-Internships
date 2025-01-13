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
  const [currentOffset, setCurrentOffset] = useState(0);
  const [processedData, setProcessedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [slideAmount, setSlideAmount] = useState(1);
  
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

  // Modified filter logic to support sliding
  useEffect(() => {
    if (!processedData.length) return;
    
    if (selectedRange === 'all') {
      setFilteredData(processedData);
      return;
    }

    const endIndex = processedData.length - currentOffset;
    const startIndex = Math.max(0, endIndex - selectedRange);
    const filtered = processedData.slice(startIndex, endIndex);
    
    setFilteredData(filtered);
  }, [selectedRange, currentOffset, processedData]);

  // Calculate if we can slide further
  const canSlideNext = useMemo(() => {
    if (selectedRange === 'all') return false;
    return currentOffset > 0;
  }, [currentOffset, selectedRange]);

  const canSlidePrevious = useMemo(() => {
    if (selectedRange === 'all') return false;
    return currentOffset < processedData.length - selectedRange;
  }, [currentOffset, selectedRange, processedData.length]);

  const handleSlide = (direction) => {
    const amount = parseInt(slideAmount) || 1;
    if (direction === 'next' && canSlideNext) {
      setCurrentOffset(prev => Math.max(0, prev - amount));
    } else if (direction === 'prev' && canSlidePrevious) {
      setCurrentOffset(prev => Math.min(processedData.length - selectedRange, prev + amount));
    }
  };

  // Reset offset when range changes
  useEffect(() => {
    setCurrentOffset(0);
  }, [selectedRange]);

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
            {/* Range Selection */}
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
            
            {/* Sliding Controls */}
            {selectedRange !== 'all' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSlide('prev')}
                  disabled={!canSlidePrevious}
                  className={`p-2 rounded-lg transition-all duration-200
                    ${canSlidePrevious 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  ←
                </button>
                
                <div className="flex items-center bg-gray-800 rounded-lg px-2">
                  <input
                    type="number"
                    min="1"
                    value={slideAmount}
                    onChange={(e) => setSlideAmount(e.target.value)}
                    className="w-16 bg-transparent text-white text-center border-0 focus:ring-1 focus:ring-indigo-500"
                    title="Number of days to slide"
                  />
                  <span className="text-gray-400 text-sm ml-1">days</span>
                </div>

                <button
                  onClick={() => handleSlide('next')}
                  disabled={!canSlideNext}
                  className={`p-2 rounded-lg transition-all duration-200
                    ${canSlideNext 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  →
                </button>
              </div>
            )}
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
                  const localDate = new Date(date+'T00:00');
                  return new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric'
                  }).format(localDate);
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
                  const localDate = new Date(date+'T00:00');
                  return new Intl.DateTimeFormat('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(localDate);
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