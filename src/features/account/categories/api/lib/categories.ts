import { db } from '@/db';

export const getCategories = async () => {
  const response = await db.query.categories.findMany();

  return response;
};
