'use client';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  onClick: () => void;
  isAddedToWishlist: boolean;
}

const HeartButton = ({ onClick, isAddedToWishlist }: Props) => {
  return (
    <button
      aria-label="Add to wishlist"
      className="absolute top-4 right-4 z-10"
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
      <Heart
        className={cn(
          isAddedToWishlist
            ? 'fill-red-600 stroke-red-600'
            : 'stroke-gray-400 fill-none',
          'w-4 h-4  hover:scale-110 hover:stroke-red-600 hover:fill-red-600 transition duration-300 ',
        )}
      />
    </button>
  );
};

export default HeartButton;
