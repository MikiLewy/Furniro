'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { CategoryType } from '@/features/account/categories/api/types/category';
import { useWishlistItem } from '@/features/wishlist/hooks/query/use-wishlist-item';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/format-price';

import HeartButton from './heart-button';
import ImageCard from './image-card';
import VariantCircle from './variant-circle';

interface Props {
  productId: number;
  title: string;
  price: number;
  imageSrc: string;
  transparentImageSrc: string;
  variants: { id: number; name: string; color: string }[];
  size?: 'sm' | 'regular';
  category: CategoryType;
  transparentFirst?: boolean;
}

const ProductCard = ({
  productId,
  title,
  imageSrc,
  transparentImageSrc,
  price,
  variants,
  size,
  category,
  transparentFirst,
}: Props) => {
  const router = useRouter();

  const user = useSession()?.data?.user;

  const { data: wishlistItemData } = useWishlistItem(
    variants?.[0]?.id,
    user?.id || '',
    !!user?.id,
  );

  return (
    <div className="min-w-[300px]">
      <div
        onClick={() =>
          router.push(
            `/collections/${category}/products/${productId}?variantId=${variants?.[0]?.id}`,
          )
        }>
        <ImageCard
          className={cn(
            size === 'sm' ? 'h-[380px]' : 'h-[450px]',
            'relative group cursor-pointer  w-full',
          )}>
          <HeartButton
            productVariantId={variants?.[0]?.id}
            wishlistItemId={wishlistItemData?.id}
          />
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
      </div>
      <div className="flex flex-col items-start gap-1 pt-3 ">
        <div className="flex gap-1">
          {variants?.map(variant => (
            <VariantCircle
              name={variant.name}
              key={variant.id}
              color={variant.color}
              onClick={() =>
                router.push(
                  `/collections/${category}/products/${productId}?variantId=${variant.id}`,
                )
              }
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
