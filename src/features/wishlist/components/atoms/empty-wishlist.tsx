import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col py-2 mb-4 gap-4 items-center justify-center text-center">
      <HeartCrack className="w-20 h-20 text-secondary-darker" />
      <p className="text-lg text-secondary-darker">Your wishlist is empty.</p>
      <p className="text-sm text-secondary-darker">
        You can add products to your wishlist by clicking the heart icon on the
        product page.
      </p>
      <Button asChild>
        <Link href="/collections/all" prefetch>
          Discover products
        </Link>
      </Button>
    </div>
  );
};

export default EmptyWishlist;
