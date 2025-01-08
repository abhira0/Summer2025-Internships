// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Summer 2025 Internships</h1>
      <p className="text-gray-600">
        Find and track the best internship opportunities for Summer 2025.
      </p>
    </div>
  );
};

export default Home;

// src/pages/Jobs.jsx
import React from 'react';

const Jobs = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Available Internships</h2>
      {/* Job listings will go here */}
    </div>
  );
};

export default Jobs;

// src/pages/Analytics.jsx
import React from 'react';

const Analytics = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      {/* Analytics content will go here */}
    </div>
  );
};

export default Analytics;

// src/pages/Login.jsx
import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {/* Login form will go here */}
      </div>
    </div>
  );
};

export default Login;

// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {/* Profile content will go here */}
    </div>
  );
};

export default Profile;