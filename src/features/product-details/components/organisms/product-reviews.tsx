import { subDays } from 'date-fns';

import { Separator } from '@/components/ui/separator';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import { ReviewWithUser } from '../../api/types/reviews';
import ReviewItem from '../molecules/reviews/review-item';

interface Props {
  productReviews: ReviewWithUser[];
}

const ProductReviews = ({ productReviews }: Props) => {
  console.log({ productReviews });

  return (
    <div>
      <h3 className="text-lg">
        Reviews{' '}
        <span className="text-base">({productReviews?.length} reviews)</span>
      </h3>
      <div className="flex flex-col gap-2 mt-4">
        {productReviews.map(review => (
          <>
            <ReviewItem
              key={review.id}
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
            <Separator />
          </>
        ))}
        <ReviewItem
          rating={4}
          title={'Great product'}
          description={'I love this product'}
          createdAt={subDays(new Date(), 5)}
          userName={getUserNameBasedOnLoginType(
            true,
            'User name',
            ' name',
            ' name',
          )}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
