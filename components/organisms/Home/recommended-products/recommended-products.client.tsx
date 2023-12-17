'use client';

import { SwiperSlide } from 'swiper/react';

import Slider from '@/components/atoms/slider/slider';
import { useRecommendedProducts } from '@/hooks/api/products/useRecommendedProducts';
import { Locale } from '@/i18n.config';
import { Language } from '@/types/enum/Language';

import ProductCard from '../../../atoms/product-card/product-card';

interface Props {
  locale: Locale;
}

const ClientRecommendedProducts = ({ locale }: Props) => {
  const { data } = useRecommendedProducts();

  return (
    <Slider>
      {data?.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard
            title={locale === Language.EN ? product.title_en : product.title_pl}
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
