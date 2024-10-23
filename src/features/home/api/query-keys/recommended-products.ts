export const recommendedProductsKeys = {
  all: ['recommended-products'] as const,
  lists: () => [...recommendedProductsKeys.all, 'list'] as const,
  list: () => [...recommendedProductsKeys.lists()] as const,
};
