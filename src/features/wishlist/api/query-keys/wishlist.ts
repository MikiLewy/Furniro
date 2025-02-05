export const wishlistKeys = {
  all: ['wishlist'] as const,
  lists: () => [...wishlistKeys.all, 'list'] as const,
  list: () => [...wishlistKeys.lists()] as const,
  details: () => [...wishlistKeys.all, 'detail'] as const,
  detail: (productVariantId: number, userId: string) =>
    [...wishlistKeys.details(), { productVariantId, userId }] as const,
};
