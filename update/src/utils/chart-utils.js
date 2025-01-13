// src/utils/chart-utils.js

export const processChartData = (data) => {
  // Process data for summary statistics
  const processSummaryStats = () => {
      const today = new Date().toISOString().split('T')[0];
      
      const totalApps = data.length;
      const todayApps = data.filter(job => 
          job.tracked_date?.startsWith(today)
      ).length;

      const totalCompanies = new Set(data.map(job => job.company_id)).size;
      const todayCompanies = new Set(
          data
              .filter(job => job.tracked_date?.startsWith(today))
              .map(job => job.company_id)
      ).size;

      let totalRejections = 0;
      let todayRejections = 0;

      data.forEach(job => {
          job.status_events?.forEach(event => {
              if (event.status === "rejected") {
                  totalRejections++;
                  if (event.timestamp?.startsWith(today)) {
                      todayRejections++;
                  }
              }
          });
      });

      return {
          todayApps,
          totalApps,
          todayCompanies,
          totalCompanies,
          todayRejections,
          totalRejections
      };
  };

  // Process data for salary chart
  const processSalaryData = () => {
      const ranges = {
          '0-20': 0,
          '21-30': 0,
          '31-40': 0,
          '41-50': 0,
          '51-60': 0,
          '61-70': 0,
          '71-80': 0,
          '81-100': 0,
          '100+': 0
      };

      const rangesAll = { ...ranges };

      data.forEach(job => {
          if (!job.salary) return;

          // Function to add to appropriate range
          const addToRange = (salary, targetRanges) => {
              if (salary <= 20) targetRanges['0-20']++;
              else if (salary <= 30) targetRanges['21-30']++;
              else if (salary <= 40) targetRanges['31-40']++;
              else if (salary <= 50) targetRanges['41-50']++;
              else if (salary <= 60) targetRanges['51-60']++;
              else if (salary <= 70) targetRanges['61-70']++;
              else if (salary <= 80) targetRanges['71-80']++;
              else if (salary <= 100) targetRanges['81-100']++;
              else targetRanges['100+']++;
          };

          // Add to all salaries
          addToRange(job.salary, rangesAll);

          // Add to hourly only if salary_period is appropriate
          if (job.salary_period <= 3) {
              addToRange(job.salary, ranges);
          }
      });

      return {
          hourly: ranges,
          all: rangesAll,
          hourlyTotal: Object.values(ranges).reduce((a, b) => a + b, 0),
          allTotal: Object.values(rangesAll).reduce((a, b) => a + b, 0)
      };
  };

  // Process data for daily applications chart - Now starts from today
  const processDailyData = () => {
      const dailyStats = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find the earliest date in the data
      let earliestDate = new Date();
      data.forEach(job => {
          if (!job.tracked_date) return;
          const jobDate = new Date(job.tracked_date);
          if (jobDate < earliestDate) {
              earliestDate = jobDate;
          }
      });

      // Initialize all dates from today backwards to earliest date
      const currentDate = new Date(today);
      while (currentDate >= earliestDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          dailyStats[dateStr] = {
              totalApplications: 0,
              uniqueCompanies: new Set(),
              rejections: 0
          };
          currentDate.setDate(currentDate.getDate() - 1);
      }

      // Process applications
      data.forEach(job => {
          if (!job.tracked_date) return;
          const dateStr = job.tracked_date.split('T')[0];
          if (dailyStats[dateStr]) {
              dailyStats[dateStr].totalApplications++;
              dailyStats[dateStr].uniqueCompanies.add(job.company_id);
          }

          // Process rejections
          job.status_events?.forEach(event => {
              if (event.status === 'rejected' && event.timestamp) {
                  const rejectDate = event.timestamp.split('T')[0];
                  if (dailyStats[rejectDate]) {
                      dailyStats[rejectDate].rejections++;
                  }
              }
          });
      });

      return dailyStats;
  };

  // Process data for location map
  const processLocationData = () => {
      const locationCounts = new Map();
      let remoteCount = 0;
      let hybridCount = 0;
      let totalCount = 0;

      data.forEach(job => {
          const location = job.job_posting_location;
          const coordinates = job.coordinates;

          if (!location) return;

          if (location.toLowerCase().includes('remote')) {
              remoteCount++;
              return;
          }
          if (location.toLowerCase().includes('hybrid')) {
              hybridCount++;
              return;
          }

          if (coordinates) {
              coordinates.forEach(coord => {
                  const [lat, lng, name] = coord;
                  if (isValidCoordinate(lat, lng)) {
                      totalCount++;
                      const key = `${lat},${lng}`;
                      if (!locationCounts.has(key)) {
                          locationCounts.set(key, {
                              count: 0,
                              name,
                              coords: [lat, lng]
                          });
                      }
                      locationCounts.get(key).count++;
                  }
              });
          }
      });

      return {
          locations: Array.from(locationCounts.entries()).map(([key, value]) => ({
              ...value,
              key
          })),
          remoteCount,
          hybridCount,
          totalCount
      };
  };

  const isValidCoordinate = (lat, lng) => {
      return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  return {
      summary: processSummaryStats(),
      salary: processSalaryData(),
      daily: processDailyData(),
      location: processLocationData()
  };
};