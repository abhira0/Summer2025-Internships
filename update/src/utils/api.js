// src/utils/api.js
export const fetchJobs = async () => {
    try {
      const [listingsResponse, trackerResponse] = await Promise.all([
        fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json'),
        fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json')
      ]);
  
      const [listings, tracker] = await Promise.all([
        listingsResponse.json(),
        trackerResponse.json()
      ]);
  
      return listings.map(item => ({
        ...item,
        date_updated: new Date(item.date_updated * 1000).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "2-digit"
        }),
        trackerInfo: tracker.find(t => t.job_posting_id === item.id)
      }));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
};

export const loadUserApplications = async () => {
try {
    const response = await fetch('/api/applications');
    if (!response.ok) throw new Error('Failed to load applications');
    return await response.json();
} catch (error) {
    console.error('Error loading applications:', error);
    return { applications: {} };
}
};

export const saveUserApplications = async (applications) => {
try {
    const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applications)
    });
    if (!response.ok) throw new Error('Failed to save applications');
    return true;
} catch (error) {
    console.error('Error saving applications:', error);
    return false;
}
};
