import { InferResultType } from '@/types/infer-db-result-type';

export type Order = InferResultType<'orders'>;

export type OrderProduct = InferResultType<
  'orderProduct',
  {
    product: true;
    productVariants: {
      with: { variantImages: true };
    };
  }
>;

export type OrderWithProduct = InferResultType<
  'orders',
  {
    orderProduct: {
      with: {
        product: true;
        productVariants: {
          with: { variantImages: true };
        };
      };
    };
  }
>;
