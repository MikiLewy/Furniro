'use client';

import Image from 'next/image';

import { formatPrice } from '@/utils/format-price';

interface Props {
  price: number;
  productName: string;
  productVariantName: string;
  thumbnail: string;
  quantity: number;
}

const CheckoutProduct = ({
  price,
  productName,
  productVariantName,
  quantity,
  thumbnail,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl p-2">
      <div className="flex gap-4 items-center">
        <div className="border relative rounded-xl p-1 sm:p-2 flex items-center justify-center">
          <Image src={thumbnail} alt={productName} width={80} height={50} />
          <div className="absolute -top-1 -right-1.5 flex items-center justify-center p-1 w-4 h-4 rounded-full bg-primary text-secondary text-xs">
            {quantity}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-medium text-sm">{productName}</h3>
              <p className="text-xs text-secondary-darker">
                {productVariantName}
              </p>
            </div>
            <p className="text-sm">{formatPrice({ amount: price || 0 })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
