'use client';

import { useParams, useRouter } from 'next/navigation';

import VariantCircle from '@/components/atoms/variant-circle';
import { ProductVariant } from '@/features/account/products/api/types/product-variant';

interface Props {
  variantName: string;
  productVariants: ProductVariant[];
}

const ProductVariants = ({ productVariants, variantName }: Props) => {
  const router = useRouter();

  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-secondary-darker">Color: {variantName}</p>
      <div className="flex items-center gap-2">
        {productVariants?.map(variant => (
          <VariantCircle
            key={variant.id}
            color={variant.color}
            name={variant.name}
            size="large"
            onClick={() =>
              router.push(
                `/collections/${category}/products/${productId}?variantId=${variant.id}`,
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
