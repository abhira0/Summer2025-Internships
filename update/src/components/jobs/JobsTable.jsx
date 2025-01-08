// src/components/jobs/JobsTable.jsx
import React from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useAuth } from '../../context/AuthContext';

const JobsTable = ({ jobs }) => {
  const { applications, updateApplication } = useApplications();
  const { user } = useAuth();

  const toggleStatus = async (jobId, type) => {
    if (!user) return;
    
    const currentStatus = applications.applications[user.username]?.[type]?.includes(jobId);
    await updateApplication(user.username, jobId, type, !currentStatus);
  };

  const isJobMarked = (jobId, type) => {
    return applications.applications[user?.username]?.[type]?.includes(jobId) || false;
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Company</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Role</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Location</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Apply</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Date Posted</th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-white">Applied</th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-white">Active</th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-white">Hide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {jobs.map((job) => (
                <tr 
                  key={job.id}
                  className={isJobMarked(job.id, 'hidden') ? 'hidden' : 'hover:bg-gray-700'}
                >
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{job.company_name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{job.title}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{job.locations}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                    <div className="flex items-center space-x-2">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Apply
                      </a>
                      <a
                        href={`https://simplify.jobs/p/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/simplify-logo.png"
                          alt="Simplify"
                          className="h-6 w-6"
                          title="See on Simplify"
                        />
                      </a>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{job.date_updated}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                    <button
                      onClick={() => toggleStatus(job.id, 'applied')}
                      className={`px-4 py-1 rounded ${
                        isJobMarked(job.id, 'applied')
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {isJobMarked(job.id, 'applied') ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-200">
                    {job.active ? 'Active' : 'Inactive'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                    <button
                      onClick={() => toggleStatus(job.id, 'hidden')}
                      className={`px-4 py-1 rounded ${
                        isJobMarked(job.id, 'hidden')
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {isJobMarked(job.id, 'hidden') ? 'Yes' : 'No'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;