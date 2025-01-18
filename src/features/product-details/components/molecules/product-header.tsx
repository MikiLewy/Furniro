import { formatPrice } from '@/utils/format-price';

import ProductTitle from '../atoms/product-title';

import ProductRating from './product-rating';

interface Props {
  productId: number;
  title: string;
  price: number;
}

const ProductHeader = ({ productId, price, title }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <ProductTitle name={title} />
        <ProductRating productId={productId} />
      </div>
      <p className="text-secondary-darker">{formatPrice({ amount: price })}</p>
    </div>
  );
};

export default ProductHeader;
