
// src/hooks/useJobs.js
import { useState, useEffect } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [listingsResponse, trackerResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json'),
          fetch('https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json')
        ]);

        const [listings, tracker] = await Promise.all([
          listingsResponse.json(),
          trackerResponse.json()
        ]);

        const processedJobs = listings.map(item => ({
          ...item,
          date_updated: new Date(item.date_updated * 1000).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit"
          }),
          trackerInfo: tracker.find(t => t.job_posting_id === item.id)
        }));

        setJobs(processedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}

