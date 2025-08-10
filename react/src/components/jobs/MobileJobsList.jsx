import React from 'react';
import { useApplications } from '../../context/ApplicationContext';

export default function MobileJobsList({ jobs }) {
  const { getApplicationStatus, updateApplication } = useApplications();

  const handleStatusToggle = async (jobId, type) => {
    const currentStatus = getApplicationStatus(jobId, type);
    await updateApplication(jobId, type, !currentStatus);
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className={`bg-gray-800 rounded-lg p-4 shadow ${
            getApplicationStatus(job.id, 'hidden') ? 'hidden' : ''
          }`}
        >
          {/* Company and Role */}
          <div className="mb-2">
            <h3 className="text-lg font-medium text-white">{job.company_name}</h3>
            <p className="text-gray-300">{job.title}</p>
          </div>

          {/* Location */}
          <div className="mb-3 text-gray-400 text-sm">
            <span>{job.locations}</span>
          </div>

          {/* Date */}
          <div className="mb-3 text-gray-400 text-sm">
            Posted: {job.date_posted}
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => handleStatusToggle(job.id, 'applied')}
              className={`px-3 py-1 rounded-full text-sm ${
                getApplicationStatus(job.id, 'applied')
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-600 text-gray-200'
              }`}
            >
              {getApplicationStatus(job.id, 'applied') ? 'Applied' : 'Not Applied'}
            </button>
            
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                job.active ? 'bg-green-600' : 'bg-gray-600'
              } text-white`}
            >
              {job.active ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Apply
              </a>
              <a
                href={`https://simplify.jobs/p/${job.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700"
              >
                Simplify
              </a>
            </div>
            
            <button
              onClick={() => handleStatusToggle(job.id, 'hidden')}
              className={`p-2 rounded-full ${
                getApplicationStatus(job.id, 'hidden')
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-200'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}