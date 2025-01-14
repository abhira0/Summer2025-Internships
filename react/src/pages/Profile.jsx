import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalApplications } from '../hooks/useLocalApplications';
import { useJobs } from '../hooks/useJobs';
import Layout from '../components/layout/Layout';
import SimplifyCookieModal from '../components/profile/SimplifyCookieModal';

const Profile = () => {
  const { user, logout } = useAuth();
  const { applications } = useLocalApplications();
  const { jobs } = useJobs();
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const userApplications = applications.applications[user?.username] || { applied: [], hidden: [] };
  const appliedJobs = jobs.filter(job => userApplications.applied.includes(job.id));
  const hiddenJobs = jobs.filter(job => userApplications.hidden.includes(job.id));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-white">
                Profile Information
              </h3>
              <button
                onClick={() => setIsCookieModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Simplify Cookie
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Username</h4>
                <p className="mt-1 text-sm text-white">{user?.username}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Application Status</h4>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Total Applications
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {appliedJobs.length}
                    </dd>
                  </div>

                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Hidden Jobs
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {hiddenJobs.length}
                    </dd>
                  </div>

                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Active Jobs
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {jobs.filter(job => job.active).length}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-4">Recent Applications</h4>
                <div className="bg-gray-700 shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-600">
                    {appliedJobs.slice(0, 5).map(job => (
                      <li key={job.id}>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm">
                                <p className="font-medium text-blue-400 truncate">
                                  {job.company_name}
                                </p>
                                <p className="ml-1 flex-shrink-0 font-normal text-gray-400">
                                  for {job.title}
                                </p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-400">
                                  <p>{job.locations}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-400 hover:text-blue-300"
                              >
                                View job
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    onClick={logout}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SimplifyCookieModal 
          isOpen={isCookieModalOpen}
          onClose={() => setIsCookieModalOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default Profile;