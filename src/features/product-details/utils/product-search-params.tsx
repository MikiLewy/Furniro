import { createLoader, parseAsInteger } from 'nuqs/server';

export const productSearchParams = {
  variantId: parseAsInteger.withDefault(0),
};

export const loadProductSearchParams = createLoader(productSearchParams);
