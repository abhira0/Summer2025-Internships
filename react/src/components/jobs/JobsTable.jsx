// src/components/jobs/JobsTable.jsx
import React from 'react';
import { useApplications } from '../../context/ApplicationContext';

export default function JobsTable({ 
  jobs, 
  pageSize, 
  currentPage, 
  onPageChange, 
  totalPages,
  totalCount, // Add this prop to get total number of jobs
}) {
  const { getApplicationStatus, updateApplication } = useApplications();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const handleStatusToggle = async (jobId, type) => {
    const currentStatus = getApplicationStatus(jobId, type);
    await updateApplication(jobId, type, !currentStatus);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-x-hidden border border-gray-700 rounded-lg">
        <div className="w-full">
          <table className="w-full table-fixed divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Apply
                </th>
                <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Applied
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Active
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Hide
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {jobs.map((job) => (
                <tr 
                  key={job.id}
                  className={getApplicationStatus(job.id, 'hidden') ? 'hidden' : 'hover:bg-gray-700'}
                >
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.company_name}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.company_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.title}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.locations}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.locations}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
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
                          className="h-5 w-5"
                          title="Apply with Simplify"
                        />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">
                    {job.date_posted}
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
          Showing {totalCount > 0 ? startIndex + 1 : 0} to {endIndex} of {totalCount} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="mt-4 sm:hidden">
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="block w-full bg-gray-700 border-gray-600 text-white rounded-md"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Page {i + 1} of {totalPages}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}