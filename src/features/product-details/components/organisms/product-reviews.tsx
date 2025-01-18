import { getProductReviews } from '../../api/lib/product-details';
import { ReviewsCard } from '../molecules/reviews/reviews-card';
import ReviewsList from '../molecules/reviews/reviews-list';

interface Props {
  productId: number;
}

const ProductReviews = async ({ productId }: Props) => {
  const productReviews = await getProductReviews(productId);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
      <ReviewsList productReviews={productReviews} />
      <ReviewsCard productReviews={productReviews} />
    </div>
  );
};

export default ProductReviews;
