import React from 'react';

const StatCard = ({ label, today, total }) => (
  <div className="bg-gray-700 rounded-lg p-6">
    <h3 className="text-gray-400 text-sm font-medium mb-4">{label}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-2xl font-semibold text-white">{today}</p>
        <p className="text-sm text-gray-400">Today</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-white">{total}</p>
        <p className="text-sm text-gray-400">Total</p>
      </div>
    </div>
  </div>
);

const SummaryStats = ({ data }) => {
  const stats = [
    {
      label: "Applications",
      today: data.todayApps,
      total: data.totalApps,
    },
    {
      label: "Companies",
      today: data.todayCompanies,
      total: data.totalCompanies,
    },
    {
      label: "Rejections",
      today: data.todayRejections,
      total: data.totalRejections,
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Summary Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            today={stat.today}
            total={stat.total}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryStats;