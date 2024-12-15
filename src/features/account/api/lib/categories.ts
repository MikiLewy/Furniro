import { db } from '@/db';

export const fetchCategories = async () => {
  const response = await db.query.categories.findMany();

  return response;
};
