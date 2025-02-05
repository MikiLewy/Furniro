import { ProductsPayload } from '@/features/products/types/products-payload';

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (payload: ProductsPayload) =>
    [...productsKeys.lists(), payload] as const,
};
