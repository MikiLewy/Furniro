import { db } from '@/db';

export const getProducts = async () => {
  const response = await db.query.products.findMany({
    with: {
      productCategory: true,
      productVariants: true,
    },
  });

  return response;
};
