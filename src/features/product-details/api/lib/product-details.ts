import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { productVariants, reviews } from '@/db/schema';

export const getProductWithVariants = async ({
  productId,
  variantId,
}: {
  productId: number;
  variantId: number;
}) => {
  const response = await db.query.productVariants.findFirst({
    where: and(
      eq(productVariants.productId, +productId),
      eq(productVariants.id, variantId),
    ),
    with: {
      product: {
        with: {
          productVariants: true,
          productCategory: {
            columns: {
              name: true,
              type: true,
            },
          },
        },
      },
      variantImages: true,
      variantTags: true,
    },
  });

  return response;
};

export const getProductReviews = async (productId: number) => {
  const response = await db.query.reviews.findMany({
    where: eq(reviews.productId, productId),
    with: {
      user: true,
    },
  });

  return response;
};
