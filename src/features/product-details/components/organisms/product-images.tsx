'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from '@/components/ui/carousel';
import { VariantImages } from '@/features/account/products/api/types/product-variant';

import CarouselImage from '../atoms/carousel-item';
import Thumbnail from '../atoms/thumbnail';
import MobileCarouselNavigator from '../molecules/mobile-carousel-navigator';

interface Props {
  images: VariantImages[];
}

const ProductImages = ({ images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="flex-1 w-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}>
        <div className="relative">
          <CarouselContent>
            {images.map(image => {
              return (
                <CarouselImage
                  key={image.id}
                  src={image.url}
                  alt={image.name}
                />
              );
            })}
          </CarouselContent>
          <MobileCarouselNavigator
            currentSlideIndex={current - 1}
            onClick={onThumbClick}
            slidesCount={api?.scrollSnapList().length || 0}
          />
        </div>
      </Carousel>
      <div className="gap-4 items-center mt-4 flex-wrap hidden lg:flex">
        {images.map((image, index) => (
          <Thumbnail
            key={image.id}
            src={image.url}
            name={image.name}
            onClick={() => onThumbClick(index)}
            isSelected={index === current - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
