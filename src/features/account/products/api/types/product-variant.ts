import { InferResultType } from '@/types/infer-db-result-type';

export type ProductVariant = InferResultType<'productVariants'>;

export type ProductVariantWithProduct = InferResultType<
  'productVariants',
  { product: true }
>;

export type ProductVariantsWithImagesAndTags = InferResultType<
  'productVariants',
  { variantImages: true; variantTags: true }
>;

export type ProductVariantsWithProductAndTagsAndImages = InferResultType<
  'productVariants',
  { variantImages: true; variantTags: true; product: true }
>;

export type VariantImages = InferResultType<'variantImages'>;
