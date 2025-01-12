// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5174';
const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`${API_URL}/api/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const updateApplication = async (jobId, status, value) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId, status, value })
      });

      if (!response.ok) throw new Error('Failed to update application');
      const data = await response.json();
      setApplications(data);
      return data;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  const getApplicationStatus = (jobId, type) => {
    if (!user?.username || !applications.applications[user.username]) return false;
    return applications.applications[user.username][type]?.includes(jobId) || false;
  };

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      updateApplication, 
      getApplicationStatus 
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}