'use client';

import Image from 'next/image';
import { useState } from 'react';

import { CarouselItem } from '@/components/ui/carousel';

interface Props {
  src: string;
  alt: string;
}

const CarouselImage = ({ src, alt }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <CarouselItem className="relative basis-full">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={550}
        style={{ opacity: isImageLoaded ? 1 : 0 }}
        onLoadingComplete={() => {
          setIsImageLoaded(true);
        }}
        className="relative z-10 object-cover max-h-[400px] w-full object-center md:max-h-[500px] 2xl:max-h-[550px] rounded-3xl cursor-grab transition-opacity duration-500 delay-200 aspect-[3/2] md:aspect-[2/1] lg:aspect-square "
      />
      <div
        style={{ opacity: isImageLoaded ? 0 : 1 }}
        className="absolute inset-0 bg-neutral-100 h-full w-full transition-opacity duration-200 rounded-3xl left-[4px]"
      />
    </CarouselItem>
  );
};

export default CarouselImage;
