'use client';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  rating: number;
  ratingScale: number;
  onClick?: (value: number) => void;
  className?: string;
}

const Ratings = ({ rating, ratingScale, onClick, className }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: ratingScale }).map((_, index) => {
        return (
          <Star
            key={index}
            onClick={() => onClick?.(index + 1)}
            className={cn(
              onClick
                ? 'cursor-pointer hover:scale-110 transition-transform duration-300'
                : '',
              rating < index + 1
                ? 'text-secondary-lighter fill-white'
                : 'text-yellow-400 fill-yellow-400',
              'w-5',
              className,
            )}
          />
        );
      })}
    </div>
  );
};

export default Ratings;
