import SectionTitle from '@/components/atoms/section-title';
import WishListList from '@/features/wishlist/components/organisms/wishlist-list';

const WishlistPage = () => {
  return (
    <section className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-12 min-h-full">
      <SectionTitle title="Wishlist" />
      <WishListList />
    </section>
  );
};

export default WishlistPage;
