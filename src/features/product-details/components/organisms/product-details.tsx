import { ProductVariant } from '@/features/account/products/api/types/product-variant';

import ProductActions from '../molecules/product-actions';
import ProductAdvantages from '../molecules/product-advantages';
import ProductTitle from '../molecules/product-title';
import ProductVariants from '../molecules/product-variants';

interface Props {
  productName: string;
  variantName: string;
  price: number;
  description: string;
  productVariants: ProductVariant[];
  thumbnail: string;
}

const ProductDetails = ({
  productName,
  description,
  variantName,
  price,
  productVariants,
  thumbnail,
}: Props) => {
  return (
    <div className="flex-1 py-2 lg:py-6 w-full">
      <div className="w-full max-w-lg flex flex-col gap-4 lg:gap-4">
        <ProductTitle name={productName} price={price} />
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
        />
        <ProductAdvantages />
      </div>
    </div>
  );
};

export default ProductDetails;
