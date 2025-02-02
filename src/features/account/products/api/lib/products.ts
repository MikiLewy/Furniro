import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { products } from '@/db/schema';

export const getProducts = async () => {
  const response = await db.query.products.findMany();

  return response;
};

export const getProductsWithCategory = async () => {
  const response = await db.query.products.findMany({
    with: {
      productCategory: true,
    },
  });

  return response;
};

export const getProductsWithVariants = async () => {
  const response = await db.query.products.findMany({
    with: {
      productVariants: true,
    },
  });

  return response;
};

export const getProductsWithVariantsImages = async ({
  categoryId,
}: {
  categoryId?: number;
}) => {
  const response = await db.query.products.findMany({
    where: categoryId ? eq(products.categoryId, categoryId) : undefined,
    with: {
      productVariants: {
        with: {
          variantImages: true,
        },
      },
    },
  });

  return response;
};

export const getProductsWithVariantsAndCategory = async ({
  categoryId,
  limit,
}: {
  categoryId?: number;
  limit?: number;
}) => {
  const response = await db.query.products.findMany({
    where: categoryId ? eq(products.categoryId, categoryId) : undefined,
    limit,
    with: {
      productVariants: {
        with: {
          variantImages: true,
          variantTags: true,
        },
      },
      productCategory: true,
    },
  });

  return response;
};
