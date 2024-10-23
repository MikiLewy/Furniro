'use client';

import { SwiperSlide } from 'swiper/react';

import ProductCard from '@components/atoms/product-card';
import Slider from '@components/atoms/slider';
import { useRecommendedProducts } from '@features/home/hooks/query/use-recommended-products';

const ClientRecommendedProducts = () => {
  const { data } = useRecommendedProducts();

  return (
    <Slider>
      {data?.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard
            title={product.title_pl}
            imageSrc={product.image}
            transparentImageSrc={product.transparentImg}
            price={product.price}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default ClientRecommendedProducts;
