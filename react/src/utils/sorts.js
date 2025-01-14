// src/utils/sorts.js

const getValueForSort = (job, column) => {
  switch (column) {
    case 'date_posted':
      return new Date(job.date_posted).getTime();
    case 'company_name':
    case 'title':
    case 'locations':
      return String(job[column] || '').toLowerCase();
    case 'active':
      return Boolean(job[column]);
    default:
      return job[column];
  }
};

export const applySorts = (jobs, activeSorts) => {
  if (!jobs || !Array.isArray(jobs)) return [];
  if (!activeSorts?.length) return jobs;

  return [...jobs].sort((a, b) => {
    for (const sort of activeSorts) {
      const aValue = getValueForSort(a, sort.column);
      const bValue = getValueForSort(b, sort.column);
      
      if (aValue === bValue) continue;
      
      const direction = sort.order === 'asc' ? 1 : -1;
      if (aValue === null || aValue === undefined) return direction;
      if (bValue === null || bValue === undefined) return -direction;
      
      return aValue < bValue ? -direction : direction;
    }
    return 0;
  });
};