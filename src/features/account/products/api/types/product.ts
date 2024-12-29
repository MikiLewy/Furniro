import { InferResultType } from '@/types/infer-db-result-type';

export type Product = InferResultType<'products'>;

export type ProductWithCategory = InferResultType<
  'products',
  { productCategory: true }
>;

export type ProductWithVariants = InferResultType<
  'products',
  { productVariants: true }
>;

export type ProductWithVariantsAndCategory = InferResultType<
  'products',
  {
    productVariants: {
      with: {
        variantImages: true;
        variantTags: true;
      };
    };
    productCategory: true;
  }
>;
