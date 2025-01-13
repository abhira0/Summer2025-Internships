import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

const SimplifyCookieModal = ({ isOpen, onClose }) => {
  const [cookie, setCookie] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchCookie();
    }
  }, [isOpen]);

  const fetchCookie = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt_token');
      const response = await axios.get('/api/simplify/cookie', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCookie(response.data.cookie);
    } catch (err) {
      console.error('Error fetching cookie:', err);
      setError('Failed to fetch current cookie');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt_token');
      await axios.put('/api/simplify/cookie', 
        { cookie }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('Simplify cookie updated successfully!');
      setError('');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error updating cookie:', err);
      setError('Failed to update Simplify cookie: ' + (err.response?.data?.detail || err.message));
      setMessage('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Simplify Cookie">
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Simplify Cookie
            </label>
            <textarea
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"
              rows={5}
              placeholder="Paste your Simplify cookie here"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Update Cookie
            </button>
          </div>
          {message && (
            <div className="mt-2 text-sm text-green-400">{message}</div>
          )}
          {error && (
            <div className="mt-2 text-sm text-red-400">{error}</div>
          )}
        </form>
      )}
    </Modal>
  );
};

export default SimplifyCookieModal;