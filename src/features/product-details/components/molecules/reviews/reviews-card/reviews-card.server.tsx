import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReviewWithUser } from '@/features/product-details/api/types/reviews';
import { RATING_SCALE } from '@/features/product-details/constants/rating-scale';
import { calculateAverageRating } from '@/features/product-details/utils/calculate-average-rating';
import { calculateRatingPercentage } from '@/features/product-details/utils/calculate-rating-percentage';

import RatingOverview from '../../../atoms/reviews/rating-overview';
import RatingProgressBar from '../../../atoms/reviews/rating-progress-bar';

import ClientReviewsCard from './reviews-card.client';

interface Props {
  productReviews: ReviewWithUser[];
}

const ServerReviewsCard = ({ productReviews }: Props) => {
  const groupedRatings = productReviews?.reduce<Record<string, number>>(
    (acc, review) => {
      acc[review.rating] = acc[review.rating] ? acc[review.rating] + 1 : 1;
      return acc;
    },
    {},
  );

  const productRatings = productReviews?.map(review => review.rating);

  const averageRating = calculateAverageRating(
    productRatings,
    productReviews?.length,
  );

  return (
    <div className="flex-1 w-full -order-1 lg:order-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-medium">Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row items-start sm:items-center">
            <RatingOverview
              averageRating={averageRating}
              totalReviews={productReviews.length}
            />
            <div className="flex flex-col gap-2 flex-2 w-full">
              {Array.from({ length: RATING_SCALE }).map((_, index) => (
                <RatingProgressBar
                  key={index}
                  rating={index + 1}
                  ratingPercentage={
                    calculateRatingPercentage(
                      groupedRatings,
                      String(index + 1),
                      productReviews.length,
                    ) || -1
                  }
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-1">
          <ClientReviewsCard />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServerReviewsCard;
