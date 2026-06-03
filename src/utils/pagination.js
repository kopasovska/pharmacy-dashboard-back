export const parsePaginationParams = (query) => {
  const page = Number(query.page) || 1;
  const perPage = Number(query.perPage) || 10;

  const skip = (page - 1) * perPage;

  return {
    page,
    perPage,
    skip,
  };
};

export const calculatePaginationData = (totalItems, page, perPage) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
