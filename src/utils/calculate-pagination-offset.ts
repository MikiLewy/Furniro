export const calculatePaginationOffset = (offset: number, limit: number) =>
  limit * (offset - 1);
