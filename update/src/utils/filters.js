// src/utils/filters.js
export const applyFilters = (jobs, activeFilters, getApplicationStatus, username) => {
    return jobs.filter(job => {
      return activeFilters.every(filter => {
        switch (filter.column) {
          case 'date':
            const jobDate = new Date(job.date_updated);
            const fromDate = filter.fromDate ? new Date(filter.fromDate) : new Date(-8640000000000000);
            const toDate = filter.toDate ? new Date(filter.toDate) : new Date(8640000000000000);
            return jobDate >= fromDate && jobDate <= toDate;
  
          case 'applied':
            return filter.applied === getApplicationStatus(job.id, 'applied');
  
          case 'hidden':
            return filter.hidden === getApplicationStatus(job.id, 'hidden');
  
          case 'active':
            return filter.active === job.active;
  
          default:
            if (!filter.conditions) return true;
            
            const text = String(job[filter.column] || '').toLowerCase();
            const evaluateCondition = (condition) => {
              const conditionValue = condition.value.toLowerCase();
              
              switch (condition.type) {
                case 'contains': return text.includes(conditionValue);
                case 'equals': return text === conditionValue;
                case 'not-equals': return text !== conditionValue;
                case 'not-contains': return !text.includes(conditionValue);
                case 'regex':
                  try {
                    return new RegExp(conditionValue, 'i').test(text);
                  } catch {
                    return false;
                  }
                case 'not-regex':
                  try {
                    return !new RegExp(conditionValue, 'i').test(text);
                  } catch {
                    return true;
                  }
                default:
                  return true;
              }
            };
  
            return filter.conditionType === 'AND'
              ? filter.conditions.every(evaluateCondition)
              : filter.conditions.some(evaluateCondition);
        }
      });
    });
  };