import { notFound } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';

import { auth } from '@/auth';
import { getProductWithVariants } from '@/features/product-details/api/lib/product-details';
import ProductDetails from '@/features/product-details/components/organisms/product-details';
import ProductImages from '@/features/product-details/components/organisms/product-images';
import ProductReviews from '@/features/product-details/components/organisms/product-reviews';
import { loadProductSearchParams } from '@/features/product-details/utils/product-search-params';
import { getWishlistItem } from '@/features/wishlist/api/lib/wishlist';

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

  const session = await auth();

  const wishlistItem = await getWishlistItem(variantId, session?.user.id || '');

  if (!productVariant) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10">
        <ProductImages images={productVariant?.variantImages} />
        <div className="flex-1 w-full flex flex-col gap-5 lg:gap-10">
          <ProductDetails
            productId={productId}
            productName={productVariant?.product?.name}
            price={productVariant?.product?.price}
            variantName={productVariant?.name}
            productVariants={productVariant?.product?.productVariants}
            description={productVariant?.product?.description}
            thumbnail={productVariant?.variantImages?.[0]?.url}
            wishlistItemId={wishlistItem?.id}
            categoryType={productVariant?.product?.productCategory?.type}
            categoryName={productVariant?.product?.productCategory?.name}
          />
        </div>
      </div>
      <ProductReviews productId={productId} />
    </section>
  );
};

export default ProductDetailsPage;
