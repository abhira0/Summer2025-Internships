import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import * as L from 'leaflet';

export const SalaryChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const labels = Object.keys(data);
    const values = Object.values(data);

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Positions',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              stepSize: 1,
            },
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} positions`;
              },
              title: function(context) {
                return `${context[0].label}/hr`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export const SummaryStats = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Applications</h3>
        <div className="grid grid-cols-2 mt-2">
          <div>
            <p className="text-2xl font-bold text-white">{data.todayApps}</p>
            <p className="text-sm text-gray-400">Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{data.totalApps}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Companies</h3>
        <div className="grid grid-cols-2 mt-2">
          <div>
            <p className="text-2xl font-bold text-white">{data.todayCompanies}</p>
            <p className="text-sm text-gray-400">Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{data.totalCompanies}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Rejections</h3>
        <div className="grid grid-cols-2 mt-2">
          <div>
            <p className="text-2xl font-bold text-white">{data.todayRejections}</p>
            <p className="text-sm text-gray-400">Today</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{data.totalRejections}</p>
            <p className="text-sm text-gray-400">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DailyApplicationsChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const dates = Object.keys(data);
    const applications = dates.map(date => data[date].totalApplications);
    const companies = dates.map(date => data[date].uniqueCompanies.size);
    const rejections = dates.map(date => data[date].rejections);

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Rejections',
            data: rejections,
            type: 'line',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.0)',
            borderWidth: 2,
            order: 0,
          },
          {
            label: 'Unique Companies',
            data: companies,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            order: 1,
          },
          {
            label: 'Total Applications',
            data: applications,
            backgroundColor: 'rgba(255, 159, 64, 0.8)',
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export const JobLocationsMap = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    // Add markers for each location
    data.locations.forEach(location => {
      const circle = L.circle(location.coords, {
        color: '#7C3AED',
        fillColor: '#7C3AED',
        fillOpacity: 0.1,
        radius: Math.sqrt(location.count) * 50000,
        weight: 1,
      }).addTo(mapInstance.current);

      circle.bindPopup(`
        <div class="bg-white p-2 rounded">
          <strong>${location.name}</strong><br/>
          Positions: ${location.count}
        </div>
      `);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div>
      <div ref={mapRef} className="h-[500px] w-full rounded-lg" />
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Remote Positions:</span>
          <span className="ml-2 text-white">{data.remoteCount}</span>
        </div>
        <div>
          <span className="text-gray-400">Hybrid Positions:</span>
          <span className="ml-2 text-white">{data.hybridCount}</span>
        </div>
        <div>
          <span className="text-gray-400">In-Person Positions:</span>
          <span className="ml-2 text-white">{data.totalCount}</span>
        </div>
      </div>
    </div>
  );
};