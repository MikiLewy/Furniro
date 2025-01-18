import { Fragment } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ReviewWithUser } from '@/features/product-details/api/types/reviews';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import NoReviewsCard from '../../atoms/reviews/no-reviews-card';
import Review from '../../atoms/reviews/review';

interface Props {
  productReviews: ReviewWithUser[];
}

const ReviewsList = ({ productReviews }: Props) => {
  return (
    <div className="flex-1 flex flex-col w-full">
      <h3 className="text-lg font-medium">
        Customers reviews{' '}
        <span className="text-base">({productReviews?.length} reviews)</span>
      </h3>
      <div className="flex flex-col gap-2 mt-4 max-h-[750px]">
        <ScrollArea>
          {productReviews?.length > 0 ? (
            productReviews.map((review, index) => (
              <Fragment key={review.id}>
                <div className="mr-4">
                  <Review
                    rating={review.rating}
                    title={review.title || ''}
                    description={review.description || ''}
                    createdAt={review.created_at}
                    userName={getUserNameBasedOnLoginType(
                      !!review?.user?.name,
                      review?.user?.name,
                      review?.user?.firstName || '',
                      review?.user?.lastName || '',
                    )}
                  />
                  {productReviews?.length - 1 !== index ? (
                    <Separator className="my-4" />
                  ) : null}
                </div>
              </Fragment>
            ))
          ) : (
            <NoReviewsCard />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ReviewsList;
