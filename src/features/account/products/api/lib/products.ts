import { and, asc, desc, eq, ilike, SQL, sql } from 'drizzle-orm';

import { db } from '@/db';
import { products } from '@/db/schema';
import { ProductsPayload } from '@/features/products/types/products-payload';
import { SortOrder } from '@/types/enum/sort-order';
import { calculatePaginationOffset } from '@/utils/calculate-pagination-offset';

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
  sortBy,
  search,
  sortOrder,
  offset,
}: ProductsPayload) => {
  const filters: SQL[] = [];

  const calculatedOffset =
    offset && limit ? calculatePaginationOffset(offset, limit) : undefined;

  if (categoryId) {
    filters.push(eq(products.categoryId, categoryId));
  }

  if (search) {
    filters.push(ilike(products.name, `%${search}%`));
  }

  const response = await db.query.products.findMany({
    where: filters.length > 0 ? and(...filters) : undefined,
    orderBy: sortBy
      ? sortOrder === SortOrder.DESC
        ? desc(sql.identifier(sortBy || ''))
        : asc(sql.identifier(sortBy || ''))
      : undefined,
    limit,
    offset: calculatedOffset,
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
