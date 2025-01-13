import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSimplify } from '../context/SimplifyContext';
import Layout from '../components/layout/Layout';
import { SummaryStats, DailyApplicationsChart, JobLocationsMap, SalaryChart } from '../components/chart-components';
import { processChartData } from '../utils/chart-utils';

const Analytics = () => {
  const { user } = useAuth();
  const { fetchData, refreshData, loading, error } = useSimplify();
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(7);

  const loadData = async () => {
    const result = await fetchData();
    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const processed = processChartData(data);
      setProcessedData(processed);
    }
  }, [data]);

  const handleRefreshData = async () => {
    const success = await refreshData();
    if (success) {
      await loadData();
    }
  };

  const handleDateRangeChange = (days) => {
    setSelectedDateRange(days);
    const processed = processChartData(data, days);
    setProcessedData(processed);
  };

  if (loading) {
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
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <button
            onClick={handleRefreshData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Refresh Data
          </button>
        </div>
        
        {processedData && (
          <>
            {/* Summary Stats Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Summary Statistics</h2>
              <SummaryStats data={processedData.summary} />
            </div>

            {/* Daily Applications Chart */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Daily Applications</h2>
                <div className="flex gap-2">
                  {[7, 14, 30, 60].map(days => (
                    <button
                      key={days}
                      onClick={() => handleDateRangeChange(days)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedDateRange === days
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                  <button
                    onClick={() => handleDateRangeChange('all')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedDateRange === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>
              <DailyApplicationsChart data={processedData.daily} />
            </div>

            {/* Salary Distribution */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Salary Distribution</h2>
              <SalaryChart data={processedData.salary} />
            </div>

            {/* Map Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Job Locations</h2>
              <JobLocationsMap data={processedData.location} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;