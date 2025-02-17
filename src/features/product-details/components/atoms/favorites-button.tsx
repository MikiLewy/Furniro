'use client';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  onClick: () => void;
  disabled: boolean;
  isFavorite: boolean;
}

const FavoritesButton = ({ disabled, onClick, isFavorite }: Props) => {
  return (
    <button
      aria-label="Add to wishlist"
      disabled={disabled}
      onClick={onClick}
      className="p-3 rounded-full border border-border flex items-center justify-center hover:bg-border transition-colors duration-300">
      <Heart
        className={cn(
          isFavorite ? 'fill-red-600 text-red-600' : 'text-secondary-darker',
          'w-5 h-5 ',
        )}
      />
    </button>
  );
};

export default FavoritesButton;
