// src/utils/api.js
import config from '../config';

export const fetchJobs = async () => {
  try {
    const [listingsResponse, trackerResponse] = await Promise.all([
      fetch(config.api.listings),
      fetch(config.api.tracker)
    ]);

    if (!listingsResponse.ok || !trackerResponse.ok) {
      throw new Error('Failed to fetch jobs');
    }

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
    throw error;
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
