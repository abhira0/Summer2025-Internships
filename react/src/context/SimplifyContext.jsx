import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SimplifyContext = createContext();

export function useSimplify() {
  const context = useContext(SimplifyContext);
  if (!context) {
    throw new Error('useSimplify must be used within a SimplifyProvider');
  }
  return context;
}


export function SimplifyProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Helper function to get token and headers
    const getAuthHeaders = () => {
      const token = localStorage.getItem('jwt_token');
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    };
  
    const updateSimplifyToken = async (cookie) => {
      try {
        setLoading(true);
        setError(null);
        await axios.put('/api/simplify/cookie', 
          { cookie }, 
          getAuthHeaders() // Add auth headers
        );
        return true;
      } catch (err) {
        setError('Failed to update Simplify cookie');
        console.error('Error updating Simplify cookie:', err);
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    const refreshData = async () => {
      try {
        setLoading(true);
        setError(null);
        // No need to send cookies in request anymore
        await axios.post('/api/simplify/refresh', {}, getAuthHeaders());
        return true;
      } catch (err) {
        setError('Failed to refresh data');
        console.error('Error refreshing data:', err);
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/simplify/parsed', 
          getAuthHeaders()
        );
        return response.data;
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
        return null;
      } finally {
        setLoading(false);
      }
    };
  
    const value = {
      loading,
      error,
      updateSimplifyToken,
      refreshData,
      fetchData,
    };
  
    return (
      <SimplifyContext.Provider value={value}>
        {children}
      </SimplifyContext.Provider>
    );
  }