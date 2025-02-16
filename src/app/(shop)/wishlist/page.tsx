import { Metadata } from 'next';

import SectionTitle from '@/components/atoms/section-title';
import WishListList from '@/features/wishlist/components/organisms/wishlist-list';

export const metadata: Metadata = {
  title: 'Wishlist',
  description:
    'Keep track of all your desired items in one place. Create, manage and organize your personal wishlist for future purchases.',
};

const WishlistPage = () => {
  return (
    <section className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-12 min-h-full">
      <SectionTitle title="Wishlist" />
      <WishListList />
    </section>
  );
};

export default WishlistPage;
