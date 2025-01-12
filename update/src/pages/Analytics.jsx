// src/pages/Analytics.jsx
import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { useLocalApplications } from '../hooks/useLocalApplications';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { jobs, loading: jobsLoading } = useJobs();
  const { applications } = useLocalApplications();
  const { user } = useAuth();

  if (jobsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  const userApplications = applications.applications[user?.username] || { applied: [], hidden: [] };
  const appliedJobs = jobs.filter(job => userApplications.applied.includes(job.id));

  // Calculate statistics
  const totalJobs = jobs.length;
  const totalApplied = appliedJobs.length;
  const applicationsPerCompany = appliedJobs.reduce((acc, job) => {
    acc[job.company_name] = (acc[job.company_name] || 0) + 1;
    return acc;
  }, {});

  const companyData = Object.entries(applicationsPerCompany)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const statusData = [
    { name: 'Applied', value: totalApplied },
    { name: 'Not Applied', value: totalJobs - totalApplied }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            description="Available positions"
          />
          <StatCard
            title="Applied"
            value={totalApplied}
            description="Submitted applications"
          />
          <StatCard
            title="Application Rate"
            value={`${((totalApplied / totalJobs) * 100).toFixed(1)}%`}
            description="Of available positions"
          />
          <StatCard
            title="Companies"
            value={Object.keys(applicationsPerCompany).length}
            description="Applied to"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Applications by Company
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#9CA3AF"
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Application Status
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      name
                    }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {`${name} ${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, description }) => (
  <div className="bg-gray-800 rounded-lg p-6">
    <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
    <dd className="mt-1 text-3xl font-semibold text-white">{value}</dd>
    <dd className="mt-1 text-sm text-gray-400">{description}</dd>
  </div>
);

export default Analytics;