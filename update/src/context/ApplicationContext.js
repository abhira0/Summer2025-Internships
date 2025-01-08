// src/context/ApplicationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadUserApplications, saveUserApplications } from '../utils/api';

const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState({ applications: {} });

  useEffect(() => {
    loadUserApplications().then(setApplications);
  }, []);

  const updateApplication = async (userId, jobId, type, value) => {
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
    await saveUserApplications(newApplications);
    return newApplications;
  };

  return (
    <ApplicationContext.Provider value={{ applications, updateApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
