export const parseSortParams = (query) => {
  const sortBy = query.sortBy || '_id';
  const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc';

  return {
    sortBy,
    sortOrder,
  };
};
