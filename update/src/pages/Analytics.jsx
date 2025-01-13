// src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSimplify } from '../context/SimplifyContext';
import Layout from '../components/layout/Layout';
import DailyApplicationsChart from '../components/analytics/DailyApplicationsChart';
import SalaryDistributionChart from '../components/analytics/SalaryDistributionChart';
import JobLocationsMap from '../components/analytics/JobLocationsMap';
import SummaryStats from '../components/analytics/SummaryStats';
import { processChartData } from '../utils/chart-utils';

const Analytics = () => {
  const { user } = useAuth();
  const { fetchData, refreshData, loading, error } = useSimplify();
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(7);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const processed = processChartData(data, selectedDateRange);
      setProcessedData(processed);
    }
  }, [data, selectedDateRange]);

  const loadData = async () => {
    try {
      const result = await fetchData();
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleRefreshData = async () => {
    try {
      setRefreshing(true);
      const success = await refreshData();
      if (success) {
        await loadData();
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleDateRangeChange = (days) => {
    setSelectedDateRange(days);
  };

  if (loading && !processedData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <button
            onClick={handleRefreshData}
            disabled={refreshing}
            className={`
              px-4 py-2 rounded-lg font-medium
              ${refreshing 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
              text-white transition-colors
            `}
          >
            {refreshing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </span>
            ) : 'Refresh Data'}
          </button>
        </div>

        {processedData && (
          <div className="space-y-6">
            {/* Summary Stats */}
            <section className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Summary Statistics</h2>
              <SummaryStats data={processedData.summary} />
            </section>

            {/* Daily Applications Chart */}
            <section className="bg-gray-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Daily Applications</h2>
                <div className="flex gap-2">
                  {[7, 14, 30, 60].map(days => (
                    <button
                      key={days}
                      onClick={() => handleDateRangeChange(days)}
                      className={`
                        px-3 py-1 rounded text-sm transition-colors
                        ${selectedDateRange === days
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }
                      `}
                    >
                      {days} Days
                    </button>
                  ))}
                  <button
                    onClick={() => handleDateRangeChange('all')}
                    className={`
                      px-3 py-1 rounded text-sm transition-colors
                      ${selectedDateRange === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    All Time
                  </button>
                </div>
              </div>
              <DailyApplicationsChart data={processedData.daily} />
            </section>

            {/* Salary Distribution */}
            <section className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Salary Distribution</h2>
              <SalaryDistributionChart data={processedData.salary} />
            </section>

            {/* Map Section */}
            <section className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Job Locations</h2>
              <JobLocationsMap data={processedData.location} />
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;