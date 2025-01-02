'use client';
import { ReactNode, useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import 'swiper/css';

interface Props {
  children: ReactNode;
}

const CategoriesSlider = ({ children }: Props) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2.5}
      breakpoints={{
        540: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        680: {
          slidesPerView: 4.5,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
        1080: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
      }}
      modules={[Navigation]}
      scrollbar={{ draggable: true }}
      onBeforeInit={swiper => {
        swiperRef.current = swiper;
      }}
      direction="horizontal"
      className="relative">
      {children}
    </Swiper>
  );
};

export default CategoriesSlider;
