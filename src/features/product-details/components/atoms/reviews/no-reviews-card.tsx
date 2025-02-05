import { MessageSquareHeart } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const NoReviewsCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-center w-full">
        <MessageSquareHeart className="min-w-10 min-h-10" />
      </CardHeader>
      <CardContent>
        <p className="text-secondary-darker text-center">
          No reviews yet. Be the first to leave one!
        </p>
      </CardContent>
    </Card>
  );
};

export default NoReviewsCard;
