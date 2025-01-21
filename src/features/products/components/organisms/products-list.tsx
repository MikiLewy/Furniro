import { auth } from '@/auth';
import ProductCard from '@/components/atoms/product-card';
import { getProductsWithVariantsAndCategory } from '@/features/account/products/api/lib/products';
import { prefetchWishlistItem } from '@/features/wishlist/api/lib/wishlist.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

interface Props {
  categoryId: number | undefined;
}

const ProductsList = async ({ categoryId }: Props) => {
  const products = await getProductsWithVariantsAndCategory({ categoryId });

  const session = await auth();

  return (
    <section>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:gap-y-6 lg:grid-cols-3 2xl:grid-cols-4  w-full">
        {products?.map(product => (
          <div key={product.id} className="col-span-1">
            <HydrationBoundaryProvider
              prefetchDataFunctions={[
                queryClient =>
                  prefetchWishlistItem(
                    queryClient,
                    product?.productVariants?.[0]?.id,
                    session?.user?.id || '',
                  ),
              ]}>
              <ProductCard
                productId={product.id}
                title={product.name}
                imageSrc={
                  product?.productVariants?.[0]?.variantImages?.[1]?.url
                }
                transparentImageSrc={
                  product?.productVariants?.[0]?.variantImages?.[0]?.url
                }
                price={product.price}
                variants={product.productVariants?.map(variant => ({
                  id: variant.id,
                  name: variant.name,
                  color: variant.color,
                }))}
                size="sm"
                category={product?.productCategory?.type}
                transparentFirst
              />
            </HydrationBoundaryProvider>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
