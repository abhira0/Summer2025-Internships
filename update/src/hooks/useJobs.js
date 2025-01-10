// src/hooks/useJobs.js
import { useState, useEffect } from 'react';
import config from '../config';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const [listingsResponse, trackerResponse] = await Promise.all([
          fetch(config.api.listings),
          fetch(config.api.tracker)
        ]);

        if (!listingsResponse.ok || !trackerResponse.ok) {
          throw new Error('Failed to fetch job data');
        }

        const [listings, tracker] = await Promise.all([
          listingsResponse.json(),
          trackerResponse.json()
        ]);

        if (!Array.isArray(listings)) {
          throw new Error('Invalid data format');
        }

        const processedJobs = listings.map(item => ({
          id: item.id,
          company_name: item.company_name,
          title: item.title,
          locations: Array.isArray(item.locations) ? item.locations.join(', ') : item.locations,
          url: item.url,
          date_posted: new Date(item.date_posted * 1000).toLocaleDateString(),
          active: item.active ?? true,
          trackerInfo: tracker.find(t => t.job_posting_id === item.id)
        }));

        setJobs(processedJobs);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}