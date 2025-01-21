import { InferResultType } from '@/types/infer-db-result-type';

export type WishlistItem = InferResultType<'wishlist'>;

export type WishlistItemWithUser = InferResultType<'wishlist', { user: true }>;

export type WishlistItemWithProductVariant = InferResultType<
  'wishlist',
  { productVariant: true }
>;

export type WishlistItemWithUserAndProductVariant = InferResultType<
  'wishlist',
  { user: true; productVariant: true }
>;
