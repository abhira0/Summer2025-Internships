export const processChartData = (data) => {
    // Process data for summary statistics
    const processSummaryStats = () => {
      const today = new Date().toISOString().split('T')[0];
      
      const totalApps = data.length;
      const todayApps = data.filter(job => 
        job.tracked_date?.startsWith(today)
      ).length;
  
      const companies = new Set(data.map(job => job.company_id));
      const todayCompanies = new Set(
        data
          .filter(job => job.tracked_date?.startsWith(today))
          .map(job => job.company_id)
      );
  
      let totalRejections = 0;
      let todayRejections = 0;
      
      data.forEach(job => {
        job.status_events?.forEach(event => {
          if (event.status === 'rejected') {
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
        todayCompanies: todayCompanies.size,
        totalCompanies: companies.size,
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
  
      data.forEach(job => {
        if (!job.salary) return;
        
        if (job.salary <= 20) ranges['0-20']++;
        else if (job.salary <= 30) ranges['21-30']++;
        else if (job.salary <= 40) ranges['31-40']++;
        else if (job.salary <= 50) ranges['41-50']++;
        else if (job.salary <= 60) ranges['51-60']++;
        else if (job.salary <= 70) ranges['61-70']++;
        else if (job.salary <= 80) ranges['71-80']++;
        else if (job.salary <= 100) ranges['81-100']++;
        else ranges['100+']++;
      });
  
      return ranges;
    };
  
    // Process data for daily applications chart
    const processDailyData = (days = 7) => {
      const dailyStats = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Initialize dates for the selected range
      for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dailyStats[dateStr] = {
          totalApplications: 0,
          uniqueCompanies: new Set(),
          rejections: 0
        };
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
  
  // Helper function to validate coordinates
  const isValidCoordinate = (lat, lng) => {
      return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };
  
  return {
      summary: processSummaryStats(),
      salary: processSalaryData(),
      daily: processDailyData(),
      location: processLocationData()
  };
}