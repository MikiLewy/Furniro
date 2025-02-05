import { getProductReviews } from '../../api/lib/product-details';
import { RATING_SCALE } from '../../constants/rating-scale';
import { calculateAverageRating } from '../../utils/calculate-average-rating';
import { convertRatingToDecimal } from '../../utils/convert-rating-to-decimal';
import Ratings from '../atoms/ratings';

interface Props {
  productId: number;
}

const ProductRating = async ({ productId }: Props) => {
  const productReviews = await getProductReviews(productId);

  const averageRating = calculateAverageRating(
    productReviews?.map(review => review.rating),
    productReviews?.length,
  );

  const decimalRating = convertRatingToDecimal(averageRating);

  return (
    <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-full">
      {decimalRating && decimalRating !== '0' ? (
        <p className="text-sm text-secondary-darker font-medium">
          {decimalRating}
        </p>
      ) : null}
      <Ratings
        rating={Math.round(averageRating)}
        ratingScale={RATING_SCALE}
        className="w-3.5"
      />
    </div>
  );
};

export default ProductRating;
