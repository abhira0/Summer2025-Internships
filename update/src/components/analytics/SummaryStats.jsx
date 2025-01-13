
// src/components/analytics/SummaryStats.jsx
import React from 'react';

export default function SummaryStats ({ data }) {
  const stats = [
    {
      label: "Applications",
      today: data.todayApps || 0,
      total: data.totalApps || 0,
    },
    {
      label: "Companies",
      today: data.todayCompanies || 0,
      total: data.totalCompanies || 0,
    },
    {
      label: "Rejections",
      today: data.todayRejections || 0,
      total: data.totalRejections || 0,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-semibold text-white">{stat.today}</p>
              <p className="text-sm text-gray-400">Today</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stat.total}</p>
              <p className="text-sm text-gray-400">Total</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};