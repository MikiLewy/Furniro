'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { VariantImages } from '@/features/account/products/api/types/product-variant';

interface Props {
  images: VariantImages[];
}

const ProductImages = ({ images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
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
    <div className="flex-1">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map(image => (
            <CarouselItem key={image.id}>
              <Image
                src={image.url}
                alt={image.name}
                width={1000}
                height={800}
                style={{ aspectRatio: '1000/800' }}
                className="object-cover max-h-[600px] rounded-3xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-4 items-center mt-4 flex-wrap">
        {images.map((image, index) => (
          <Image
            key={image.id}
            src={image.url}
            alt={image.name}
            onClick={() => onThumbClick(index)}
            width={100}
            height={90}
            style={{ aspectRatio: '80/80' }}
            className=" object-cover h-[80px] w-[80px] rounded-lg cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
