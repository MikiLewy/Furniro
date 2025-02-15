import { ProductVariant } from '@/features/account/products/api/types/product-variant';

import ProductActions from '../molecules/product-actions';
import ProductAdvantages from '../molecules/product-advantages';
import ProductHeader from '../molecules/product-header';
import ProductVariants from '../molecules/product-variants';

interface Props {
  productId: number;
  productName: string;
  variantName: string;
  price: number;
  description: string;
  productVariants: ProductVariant[];
  thumbnail: string;
  wishlistItemId: number | undefined;
  categoryType: string;
  categoryName: string;
}

const ProductDetails = async ({
  productId,
  productName,
  description,
  variantName,
  price,
  productVariants,
  thumbnail,
  wishlistItemId,
  categoryType,
  categoryName,
}: Props) => {
  return (
    <div className="flex-1 py-2 lg:py-6 w-full">
      <div className="w-full flex flex-col gap-4 lg:gap-4">
        <ProductHeader
          title={productName}
          productId={productId}
          price={price}
          categoryName={categoryName}
          categoryType={categoryType}
        />
        <div
          className="text-secondary-darker"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <ProductVariants
          productVariants={productVariants}
          variantName={variantName}
        />
        <ProductActions
          price={price}
          productName={productName}
          productVariantName={variantName}
          thumbnail={thumbnail}
          wishlistItemId={wishlistItemId}
        />
        <ProductAdvantages />
      </div>
    </div>
  );
};

export default ProductDetails;
