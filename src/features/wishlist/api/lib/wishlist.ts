import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { wishlist } from '@/db/schema';

export const getWishlistItem = async (
  productVariantId: number,
  userId: string,
) => {
  const data = await db.query.wishlist.findFirst({
    where: and(
      eq(wishlist.productVariantId, productVariantId),
      eq(wishlist.userId, userId),
    ),
  });

  return data || null;
};

export const getWishlistItemsWithProductVariant = async (userId: string) => {
  const data = await db.query.wishlist.findMany({
    where: eq(wishlist.userId, userId),
    with: {
      productVariant: {
        with: {
          variantImages: true,
          product: {
            with: {
              productCategory: true,
            },
          },
        },
      },
    },
  });

  return data;
};
