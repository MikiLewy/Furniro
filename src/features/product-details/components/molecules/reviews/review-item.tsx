import { formatDistance } from 'date-fns';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  rating: number;
  title: string;
  description: string;
  createdAt: Date;
  userName: string;
}

const ReviewItem = ({
  title,
  createdAt,
  description,
  rating,
  userName,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            console.log({ rating, index });
            return (
              <Star
                key={index}
                className={cn(
                  rating < index + 1
                    ? 'text-secondary-lighter fill-white'
                    : 'text-yellow-400 fill-yellow-400',
                  ' w-5',
                )}
              />
            );
          })}
        </p>
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

export default ReviewItem;
