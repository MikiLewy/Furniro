import { formatPrice } from '@/utils/format-price';

interface Props {
  name: string;
  price: number;
}

const ProductTitle = ({ name, price }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-secondary-darker">{formatPrice({ amount: price })}</p>
    </div>
  );
};

export default ProductTitle;
