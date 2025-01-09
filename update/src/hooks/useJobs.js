// src/hooks/useJobs.js
import { useState, useEffect } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Log the fetch attempt
        console.log('Fetching jobs data...');

        const [listingsResponse, trackerResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json'),
          fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json')
        ]);

        // Log the responses
        console.log('Listings response:', listingsResponse.status);
        console.log('Tracker response:', trackerResponse.status);

        if (!listingsResponse.ok || !trackerResponse.ok) {
          throw new Error('Failed to fetch job data');
        }

        const [listings, tracker] = await Promise.all([
          listingsResponse.json(),
          trackerResponse.json()
        ]);

        // Log the data received
        console.log('Listings count:', listings.length);
        console.log('Sample listing:', listings[0]);

        const processedJobs = listings.map(item => ({
          id: item.id,
          company_name: item.company_name,
          title: item.title,
          locations: Array.isArray(item.locations) ? item.locations.join(', ') : item.locations,
          url: item.url,
          date_updated: new Date(item.date_updated * 1000).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit"
          }),
          active: item.active ?? true,
          trackerInfo: tracker.find(t => t.job_posting_id === item.id)
        }));

        // Log processed jobs
        console.log('Processed jobs count:', processedJobs.length);
        console.log('Sample processed job:', processedJobs[0]);

        setJobs(processedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}