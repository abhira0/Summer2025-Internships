// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userApplications');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('userApplications', JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications:', error);
    }
  }, [applications]);

  const getApplicationStatus = (jobId, type) => {
    if (!user?.username || !applications.applications[user.username]) return false;
    return applications.applications[user.username][type]?.includes(jobId) || false;
  };

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
      setApplications(newApplications);

      // Optional: sync with server
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newApplications)
        });
        if (!response.ok) throw new Error('Failed to sync with server');
      } catch (error) {
        console.warn('Failed to sync with server:', error);
      }

      return newApplications;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
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