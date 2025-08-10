// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('jwt_token');
          const response = await axios.get(`/api/applications`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setApplications(response.data);
        } catch (error) {
          console.error('Error loading applications:', error);
        }
      }
    };

    fetchApplications();
  }, [user]);

  const updateApplication = async (jobId, status, value) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.post(
        `/api/applications`,
        { job_id: jobId, status, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setApplications(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  const getApplicationStatus = (jobId, type) => {
    if (!user?.username || !applications.applications[user.username]) return false;
    return applications.applications[user.username][type]?.includes(jobId) || false;
  };

  const value = {
    applications,
    updateApplication,
    getApplicationStatus
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}
