import { formatDistance } from 'date-fns';

import { RATING_SCALE } from '@/features/product-details/constants/rating-scale';

import Ratings from '../ratings';

interface Props {
  rating: number;
  title: string;
  description: string;
  createdAt: Date;
  userName: string;
}

const Review = ({ title, createdAt, description, rating, userName }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Ratings rating={rating} ratingScale={RATING_SCALE} />
        <p className="text-secondary-darker text-sm">
          {formatDistance(createdAt, new Date(), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="mt-1">
        {title ? <h5 className="font-medium text-sm">{title}</h5> : null}
        <p className="text-sm text-secondary-darker">{userName}</p>
      </div>
      {description ? <p className="text-sm font-light">{description}</p> : null}
    </div>
  );
};

export default Review;
