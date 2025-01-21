import { auth } from '@/auth';

import { getWishlistItemsWithProductVariant } from '../../api/lib/wishlist';
import EmptyWishlist from '../atoms/empty-wishlist';
import WishlistItemCard from '../atoms/wishlist-item-card';

const WishListList = async () => {
  const session = await auth();

  const wishlistItems = await getWishlistItemsWithProductVariant(
    session?.user?.id || '',
  );

  return (
    <section>
      {wishlistItems?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-y-10 lg:grid-cols-3 2xl:grid-cols-4 w-full">
          {wishlistItems?.map(wishlistItem => {
            return (
              <WishlistItemCard
                key={wishlistItem.id}
                wishlistItemId={wishlistItem.id}
                href={`/collections/${wishlistItem?.productVariant?.product?.productCategory.type}/products/${wishlistItem?.productVariant?.product?.id}?variantId=${wishlistItem?.productVariant?.id}`}
                title={wishlistItem?.productVariant?.product?.name}
                price={wishlistItem?.productVariant?.product?.price}
                imageSrc={wishlistItem.productVariant?.variantImages?.[0]?.url}
                productId={wishlistItem?.productVariant?.product?.id}
                productVariantName={wishlistItem?.productVariant?.name}
                variantId={wishlistItem?.productVariant?.id}
              />
            );
          })}
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </section>
  );
};

export default WishListList;
