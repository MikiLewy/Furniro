'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';

import { CategoryType } from '@/features/account/categories/api/types/category';
import { useAddProductToWishlist } from '@/features/wishlist/hooks/action/use-add-product-to-wishlist';
import { useRemoveProductFromWishlist } from '@/features/wishlist/hooks/action/use-remove-product-from-wishlist';
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

  const { execute: addProductToWishlist } = useAddProductToWishlist();

  const { execute: removeProductFromWishlist } = useRemoveProductFromWishlist();

  const onClickWishlistButton = () => {
    if (wishlistItemData?.id) {
      removeProductFromWishlist({
        wishlistItemId: wishlistItemData?.id,
      });
    } else {
      addProductToWishlist({ productVariantId: variants?.[0]?.id });
    }
  };

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
            onClick={onClickWishlistButton}
            isAddedToWishlist={!!wishlistItemData?.id}
          />
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={cn(
              transparentFirst
                ? 'opacity-0  lg:group-hover:opacity-100 transition duration-300'
                : 'lg:group-hover:hidden',
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
                ? 'lg:group-hover:hidden'
                : 'opacity-0 lg:group-hover:opacity-100 transition duration-300',
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
        <h4 className="text-lg font-semibold cursor-pointer">{title}</h4>
        <p className="text-base font-medium text-gray-400">
          {formatPrice({ amount: price })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
