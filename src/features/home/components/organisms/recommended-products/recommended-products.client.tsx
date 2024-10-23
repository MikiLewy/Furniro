'use client';

import { SwiperSlide } from 'swiper/react';

import ProductCard from '@components/atoms/product-card';
import Slider from '@components/atoms/slider';
import { useRecommendedProducts } from '@features/home/hooks/query/use-recommended-products';

import { Locale } from '../../../../../i18n.config';
import { Language } from '../../../../../types/enum/language';

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
