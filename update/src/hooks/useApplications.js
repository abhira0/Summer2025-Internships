// src/hooks/useApplications.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useApplications() {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    const loadApplications = () => {
      try {
        const stored = localStorage.getItem('userApplications');
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    };

    loadApplications();
  }, []);

  const updateApplication = async (userId, jobId, type, value) => {
    try {
      const newApplications = { ...applications };
      if (!newApplications.applications[userId]) {
        newApplications.applications[userId] = { applied: [], hidden: [] };
      }
      
      const typeArray = newApplications.applications[userId][type];
      const index = typeArray.indexOf(jobId);
      
      if (value && index === -1) {
        typeArray.push(jobId);
      } else if (!value && index !== -1) {
        typeArray.splice(index, 1);
      }

      setApplications(newApplications);
      localStorage.setItem('userApplications', JSON.stringify(newApplications));
      
      // Optional: sync with server
      try {
        await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newApplications)
        });
      } catch (error) {
        console.warn('Failed to sync with server:', error);
      }

      return newApplications;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  return { applications, updateApplication };
}