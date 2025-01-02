import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { productVariants } from '@/db/schema';

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
      product: true,
      variantImages: true,
      variantTags: true,
    },
  });

  return response;
};
