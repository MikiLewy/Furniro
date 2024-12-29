import { db } from '@/db';

export const getProducts = async () => {
  const response = await db.query.products.findMany({
    with: {
      productCategory: true,
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true,
        },
      },
    },
  });

  return response;
};
