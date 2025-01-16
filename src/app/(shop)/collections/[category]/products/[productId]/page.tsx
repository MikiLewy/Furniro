import { notFound } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';

import {
  getProductReviews,
  getProductWithVariants,
} from '@/features/product-details/api/lib/product-details';
import ProductDetails from '@/features/product-details/components/organisms/product-details';
import ProductImages from '@/features/product-details/components/organisms/product-images';
import ProductReviews from '@/features/product-details/components/organisms/product-reviews';
import { loadProductSearchParams } from '@/features/product-details/utils/product-search-params';

interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<SearchParams>;
}

const ProductDetailsPage = async ({ params, searchParams }: Props) => {
  const productId = +(await params).productId;

  const { variantId } = await loadProductSearchParams(searchParams);

  const productVariant = await getProductWithVariants({
    productId,
    variantId,
  });

  const productReviews = await getProductReviews(productId);

  if (!productVariant) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10">
        <ProductImages images={productVariant?.variantImages} />
        <div className="flex-1 w-full flex flex-col gap-5 lg:gap-10">
          <ProductDetails
            productName={productVariant?.product?.name}
            price={productVariant?.product?.price}
            variantName={productVariant?.name}
            productVariants={productVariant?.product?.productVariants}
            description={productVariant?.product?.description}
            thumbnail={productVariant?.variantImages?.[0]?.url}
          />
          <ProductReviews productReviews={productReviews} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
