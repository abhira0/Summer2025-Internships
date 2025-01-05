// Global app configurations and shared utilities
const APP_CONFIG = {
    apiEndpoints: {
        jobs: 'data/jobs.json',
        users: 'data/users.json'
    }
};

// Utility functions that might be used across different pages
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },
    
    showError: (message) => {
        alert(message); // In production, use a proper error handling UI
    }
};
