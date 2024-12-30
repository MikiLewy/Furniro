import { db } from '@/db';

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

export const getProductsWithVariantsImages = async () => {
  const response = await db.query.products.findMany({
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

export const getProductsWithVariantsAndCategory = async () => {
  const response = await db.query.products.findMany({
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
