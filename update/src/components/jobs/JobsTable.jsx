// src/components/jobs/JobsTable.jsx
import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';

const ITEMS_PER_PAGE = 25;

export default function JobsTable({ jobs }) {
  const { getApplicationStatus, updateApplication } = useApplications();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleStatusToggle = async (jobId, type) => {
    const currentStatus = getApplicationStatus(jobId, type);
    await updateApplication(jobId, type, !currentStatus);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-x-hidden border border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Apply
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Applied
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Active
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider w-1/12">
                  Hide
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {paginatedJobs.map((job) => (
                <tr 
                  key={job.id}
                  className={getApplicationStatus(job.id, 'hidden') ? 'hidden' : 'hover:bg-gray-800'}
                >
                  <td className="px-4 py-3 text-sm text-gray-200 truncate max-w-[200px]">
                    {job.company_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 truncate max-w-[200px]">
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 truncate max-w-[200px]">
                    {job.locations}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Apply
                      </a>
                      <a
                        href={`https://simplify.jobs/p/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Simplify
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">
                    {job.date_updated}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => handleStatusToggle(job.id, 'applied')}
                      className={`px-2 py-1 text-xs rounded w-16 ${
                        getApplicationStatus(job.id, 'applied')
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {getApplicationStatus(job.id, 'applied') ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      job.active ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => handleStatusToggle(job.id, 'hidden')}
                      className={`px-2 py-1 text-xs rounded w-16 ${
                        getApplicationStatus(job.id, 'hidden')
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {getApplicationStatus(job.id, 'hidden') ? 'Yes' : 'No'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, jobs.length)} of {jobs.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}