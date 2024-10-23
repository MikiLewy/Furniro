'use client';

import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import { useRecommendedProducts } from '@/hooks/api/products/use-recommended-products';
import { Locale } from '@/i18n.config';
import { Language } from '@/types/enum/Language';
import ProductCard from '@components/atoms/product-card/product-card';
import Slider from '@components/atoms/slider/slider';

interface Props {
  locale: Locale;
}

const ClientRecommendedProducts = ({ locale }: Props) => {
  const { data } = useRecommendedProducts();

  return (
    <Slider>
      {data?.map(product => (
        <SwiperSlide key={product.id}>
          <Link href={`/products/${product.id}`}>
            <ProductCard
              title={locale === Language.EN ? product.title_en : product.title_pl}
              imageSrc={product.image}
              transparentImageSrc={product.transparentImg}
              price={product.price}
              locale={locale}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default ClientRecommendedProducts;
