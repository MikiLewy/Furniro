import { RATING_SCALE } from '@/features/product-details/constants/rating-scale';
import { convertRatingToDecimal } from '@/features/product-details/utils/convert-rating-to-decimal';

import Ratings from '../ratings';

interface Props {
  averageRating: number;
  totalReviews: number;
}

const RatingOverview = ({ averageRating, totalReviews }: Props) => {
  return (
    <div className="flex flex-col items-center sm:flex-1 gap-2 text-center w-full">
      <p className="text-3xl font-medium">
        {convertRatingToDecimal(averageRating)}{' '}
        <span className="text-base text-secondary-lighter">
          /{RATING_SCALE}
        </span>
      </p>
      <Ratings rating={Math.round(averageRating)} ratingScale={RATING_SCALE} />
      <p className="text-sm text-secondary-darker">
        ({totalReviews} {totalReviews > 1 ? 'reviews' : 'review'})
      </p>
    </div>
  );
};

export default RatingOverview;
