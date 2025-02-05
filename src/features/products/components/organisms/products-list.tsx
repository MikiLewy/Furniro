'use client';

import ProductCard from '@/components/atoms/product-card';
import SkeletonsLoader from '@/components/atoms/skeletons-loader';
import { ProductWithVariantsAndCategory } from '@/features/account/products/api/types/product';

import NoProductsFound from '../molecules/no-products-found';

interface Props {
  products: ProductWithVariantsAndCategory[];
  isLoading: boolean;
  lastElementRef: (node: HTMLDivElement) => void;
}

const ProductsList = ({ products, isLoading, lastElementRef }: Props) => {
  if (isLoading) {
    return <SkeletonsLoader />;
  }

  if (!products || products?.length <= 0) {
    return <NoProductsFound />;
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:gap-y-6 lg:grid-cols-3 2xl:grid-cols-4  w-full">
      {products?.map(product => (
        <div key={product.id} className="col-span-1" ref={lastElementRef}>
          <ProductCard
            productId={product.id}
            title={product.name}
            imageSrc={product?.productVariants?.[0]?.variantImages?.[1]?.url}
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
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
