'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import toast from 'react-hot-toast';

import { wishlistKeys } from '@/features/wishlist/api/query-keys/wishlist';
import { addToWishlist } from '@/features/wishlist/server/actions/add-to-wishlist';
import { removeFromWishlist } from '@/features/wishlist/server/actions/remove-from-wishlist';
import { cn } from '@/lib/utils';

interface Props {
  wishlistItemId: number | undefined;
  productVariantId: number;
}

const HeartButton = ({ productVariantId, wishlistItemId }: Props) => {
  const queryClient = useQueryClient();

  const { execute: addProductToWishlist } = useAction(addToWishlist, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: wishlistKeys.details() });
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const { execute: removeProductFromWishlist } = useAction(removeFromWishlist, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: wishlistKeys.details() });
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onClickFavoriteButton = () => {
    if (wishlistItemId) {
      removeProductFromWishlist({
        wishlistItemId,
      });
    } else {
      addProductToWishlist({ productVariantId });
    }
  };

  return (
    <button
      className="absolute top-4 right-4 z-10"
      onClick={e => {
        e.stopPropagation();
        onClickFavoriteButton();
      }}>
      <Heart
        className={cn(
          wishlistItemId
            ? 'fill-red-600 stroke-red-600'
            : 'stroke-gray-400 fill-none',
          'w-4 h-4  hover:scale-110 hover:stroke-red-600 hover:fill-red-600 transition duration-300 ',
        )}
      />
    </button>
  );
};

export default HeartButton;
