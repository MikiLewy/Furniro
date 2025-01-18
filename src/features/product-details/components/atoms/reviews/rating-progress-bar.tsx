import { Star } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

interface Props {
  rating: number;
  ratingPercentage: number;
}

const RatingProgressBar = ({ rating, ratingPercentage }: Props) => {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex items-center gap-1 text-secondary-darker flex-1">
        <Star className="w-3" />
        <p>{rating}</p>
        <Progress value={ratingPercentage} className="h-3" />
      </div>
    </div>
  );
};

export default RatingProgressBar;
