'use client';

import { ReactNode, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import { cn } from '@/lib/utils';

import { Arrow } from '../../../../icons/arrow';
import 'swiper/css';

interface Props {
  children: ReactNode;
}

const RecommendedProductsSlider = ({ children }: Props) => {
  const swiperRef = useRef<SwiperType>();

  const [shouldShowSlider, setShouldShowSlider] = useState(false);

  return (
    <Swiper
      className={cn(
        shouldShowSlider ? 'opacity-100' : 'opacity-0 ',
        'relative transition-all duration-500',
      )}
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      modules={[Navigation]}
      scrollbar={{ draggable: true }}
      onBeforeInit={swiper => {
        swiperRef.current = swiper;
        setShouldShowSlider(true);
      }}
      direction="horizontal">
      {children}
      <div
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-16 h-16 hidden cursor-pointer rounded-full md:flex items-center justify-center backdrop-blur-md bg-opacity-60 bg-white top-[35%] absolute z-50 
        ">
        <Arrow className=" w-5 h-5 rotate-90 stroke-[1.5px] stroke-[#393939] " />
      </div>
      <div
        onClick={() => swiperRef.current?.slideNext()}
        className="w-16 h-16 hidden cursor-pointer rounded-full  md:flex items-center justify-center backdrop-blur-md bg-white  bg-opacity-60 top-[35%] right-0 absolute z-50 ">
        <Arrow className="w-5 h-5 -rotate-90 stroke-[1.5px] stroke-[#393939] " />
      </div>
    </Swiper>
  );
};

export default RecommendedProductsSlider;
