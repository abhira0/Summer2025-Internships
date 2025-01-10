// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BACKEND_URL = window.location.hostname.includes('github.dev') 
  ? `https://${window.location.hostname.replace('5173', '5174')}`
  : 'http://localhost:5174';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch configuration
const fetchConfig = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
};

const response = await fetch(`${BACKEND_URL}/api/applications`, fetchConfig);
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const updateApplication = async (jobId, type, value) => {
    if (!user?.username) return;

    try {
      const newApplications = { ...applications };
      if (!newApplications.applications[user.username]) {
        newApplications.applications[user.username] = { applied: [], hidden: [] };
      }
      
      const typeArray = newApplications.applications[user.username][type] || [];
      const index = typeArray.indexOf(jobId);
      
      if (value && index === -1) {
        typeArray.push(jobId);
      } else if (!value && index !== -1) {
        typeArray.splice(index, 1);
      }

      newApplications.applications[user.username][type] = typeArray;
      
      const response = await fetch(`${BACKEND_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplications)
      });

      if (!response.ok) throw new Error('Failed to sync with server');
      
      setApplications(newApplications);
      return newApplications;
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
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        updateApplication, 
        getApplicationStatus 
      }}
    >
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