import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Heart } from '../../icons/heart';
import { formatPrice } from '../../utils/format-price';

import ImageCard from './image-card';

interface Props {
  title: string;
  price: number;
  imageSrc: string;
  transparentImageSrc: string;
  variants: { id: number; name: string; color: string }[];
  size?: 'sm' | 'regular';
  transparentFirst?: boolean;
}

const ProductCard = ({
  title,
  imageSrc,
  transparentImageSrc,
  price,
  variants,
  size,
  transparentFirst,
}: Props) => {
  return (
    <div className="min-w-[300px]">
      <ImageCard
        className={cn(
          size === 'sm' ? 'h-[380px]' : 'h-[450px]',
          'relative group cursor-pointer  w-full',
        )}>
        <div className="absolute top-4 right-4 z-20">
          <Heart className=" w-4 h-4  fill-none stroke-gray-400 hover:scale-110 hover:stroke-red-600 hover:fill-red-600 transition duration-300 " />
        </div>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={cn(
            transparentFirst
              ? 'opacity-0  group-hover:opacity-100 transition duration-300'
              : 'group-hover:hidden',
            'block absolute h-full w-full object-cover object-bottom ',
          )}
          draggable="false"
        />
        <Image
          src={transparentImageSrc}
          alt={title}
          fill
          className={cn(
            transparentFirst
              ? 'group-hover:hidden'
              : 'opacity-0 group-hover:opacity-100 transition duration-300',
            ' absolute h-full w-full object-contain object-center ',
          )}
          draggable="false"
        />
      </ImageCard>
      <div className="flex flex-col items-start gap-1 pt-3 ">
        <div className="flex gap-1">
          {variants?.map(variant => (
            <div
              key={variant.id}
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: variant?.color }}
            />
          ))}
        </div>
        <h5 className="text-lg font-semibold cursor-pointer">{title}</h5>
        <p className="text-base font-medium text-gray-400">
          {formatPrice({ amount: price })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
