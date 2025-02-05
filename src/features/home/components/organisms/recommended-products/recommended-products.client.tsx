'use client';

import { SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/atoms/product-card';
import { ProductWithVariantsAndCategory } from '@/features/account/products/api/types/product';
import RecommendedProductsSlider from '@/features/home/components/molecules/recommended-products-slider';

interface Props {
  products: ProductWithVariantsAndCategory[];
}

const ClientRecommendedProducts = ({ products }: Props) => {
  return (
    <RecommendedProductsSlider>
      {products?.map(product => (
        <SwiperSlide key={product.id}>
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
            category={product?.productCategory?.type}
          />
        </SwiperSlide>
      ))}
    </RecommendedProductsSlider>
  );
};

export default ClientRecommendedProducts;
