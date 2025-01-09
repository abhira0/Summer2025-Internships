  // src/utils/sorts.js
  export const applySorts = (jobs, activeSorts) => {
    if (!activeSorts.length) return jobs;
  
    return [...jobs].sort((a, b) => {
      for (const sort of activeSorts) {
        const aValue = getValue(a, sort.column);
        const bValue = getValue(b, sort.column);
        
        if (aValue === bValue) continue;
        
        const direction = sort.order === 'asc' ? 1 : -1;
        return aValue < bValue ? -direction : direction;
      }
      return 0;
    });
  };
  
  const getValue = (job, column) => {
    const value = job[column];
    
    switch (column) {
      case 'date':
        return new Date(job.date_updated);
      case 'applied':
      case 'active':
      case 'hidden':
        return Boolean(value);
      default:
        return String(value).toLowerCase();
    }
  };