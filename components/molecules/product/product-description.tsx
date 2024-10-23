'use client';

import Button from '@/components/atoms/button/button';
import { Locale } from '@/i18n.config';
import { Heart } from '@/icons/heart';

interface Props {
  id: number;
  locale: Locale;
}

const ProductDescription = ({ id, locale }: Props) => {
  // const { data, isLoading, error } = useProduct(id);

  // if (isLoading) {
  //   return <Skeleton />;
  // }

  // if (error) {
  //   return 'Error';
  // }

  // if (!data) {
  //   return 'Product not found!';
  // }

  // const product = data[0];

  // const handleAddToCart = () => {};

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* <h2 className="text-2xl">{locale === Language.EN ? product.title_en : product.title_pl}</h2> */}
        <Heart className="w-6 h-6 fill-none stroke-gray-400 hover:scale-110 hover:stroke-red-600 transition duration-300 cursor-pointer " />
      </div>
      {/* <p className="text-primary font-medium">{formatPrice({ amount: product.price, language: locale })}</p> */}

      <Button size="lg" className="mt-4" fullWidth onClick={() => {}}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductDescription;
