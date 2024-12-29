'use client';

import { SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/atoms/product-card';
import { ProductWithVariantsAndCategory } from '@/features/account/products/api/types/product';
import Slider from '@components/atoms/slider';

interface Props {
  products: ProductWithVariantsAndCategory[];
}

const ClientRecommendedProducts = ({ products }: Props) => {
  return (
    <Slider>
      {products?.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard
            title={product.name}
            imageSrc={product.productVariants[0].variantImages[2].url}
            transparentImageSrc={
              product.productVariants[0].variantImages[0].url
            }
            price={product.price}
            variants={product.productVariants?.map(variant => ({
              id: variant.id,
              name: variant.name,
              color: variant.color,
            }))}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default ClientRecommendedProducts;
