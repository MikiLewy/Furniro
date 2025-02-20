'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import toast from 'react-hot-toast';

import ImageCard from '@/components/atoms/image-card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/features/cart/store/cart-store';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/format-price';

import { useRemoveProductFromWishlist } from '../../hooks/action/use-remove-product-from-wishlist';

interface Props {
  wishlistItemId: number;
  title: string;
  price: number;
  imageSrc: string;
  href: string;
  variantId: number;
  productVariantName: string;
  productId: number;
}

const WishlistItemCard = ({
  wishlistItemId,
  title,
  href,
  imageSrc,
  price,
  productId,
  productVariantName,
  variantId,
}: Props) => {
  const router = useRouter();

  const addToCart = useCartStore(state => state.addToCart);

  const { execute: removeProductFromWishlist } = useRemoveProductFromWishlist();

  return (
    <div className="min-w-[300px]">
      <div onClick={() => router.push(href)}>
        <ImageCard className={cn('h-[380px] relative cursor-pointer w-full')}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={cn(
              'absolute h-full w-full object-contain object-center ',
            )}
            draggable="false"
          />
          <button
            aria-label="Remove from wishlist"
            className="absolute top-1 right-1 p-2 z-50">
            <X
              className="text-secondary-darker"
              onClick={e => {
                e.stopPropagation();
                removeProductFromWishlist({ wishlistItemId });
              }}
            />
          </button>
        </ImageCard>
      </div>
      <div className="flex flex-col items-start gap-1 pt-3 ">
        <h5 className="text-lg font-semibold cursor-pointer">{title}</h5>
        <p className="text-base font-medium text-gray-400">
          {formatPrice({ amount: price })}
        </p>
        <Button
          variant="outline"
          className="w-full my-2"
          onClick={() => {
            addToCart({
              variantId,
              productVariantName,
              productId,
              productName: title,
              price,
              thumbnail: imageSrc,
              quantity: 1,
            });
            toast.success('Product added to cart');
          }}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistItemCard;
