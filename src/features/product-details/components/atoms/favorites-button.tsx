'use client';

import { Heart } from 'lucide-react';

const FavoritesButton = () => {
  return (
    <button className="p-3 rounded-full border border-border flex items-center justify-center hover:bg-border transition-colors duration-300">
      <Heart className="w-5 h-5 text-secondary-darker" />
    </button>
  );
};

export default FavoritesButton;
