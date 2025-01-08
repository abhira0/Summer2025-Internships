// src/utils/sorts.js
export const applySorts = (jobs, activeSorts) => {
return [...jobs].sort((a, b) => {
    for (const sort of activeSorts) {
    const valueA = a[sort.column];
    const valueB = b[sort.column];
    
    if (valueA < valueB) return sort.order === 'asc' ? -1 : 1;
    if (valueA > valueB) return sort.order === 'asc' ? 1 : -1;
    }
    return 0;
});
};