import React, { useEffect, useState } from 'react';
import { useSimplify } from '../context/SimplifyContext';
import Layout from '../components/layout/Layout';
import DailyApplicationsChart from '../components/analytics/DailyApplicationsChart';
import SalaryDistributionChart from '../components/analytics/SalaryDistributionChart';
import JobLocationsMap from '../components/analytics/JobLocationsMap';
import SummaryStats from '../components/analytics/SummaryStats';
import { processChartData } from '../utils/chart-utils';

const Analytics = () => {
  const { fetchData, refreshData, loading, error } = useSimplify();
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const processed = processChartData(data);
      setProcessedData(processed);
    }
  }, [data]);

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
            <SummaryStats data={processedData.summary} />
            <DailyApplicationsChart data={processedData.daily} />
            <SalaryDistributionChart data={processedData.salary} />
            <JobLocationsMap data={processedData.location} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;