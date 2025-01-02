import { notFound } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';

import { getProductWithVariants } from '@/features/product-details/api/lib/product-details';
import ProductImages from '@/features/product-details/components/organisms/product-images';
import { loadProductSearchParams } from '@/features/product-details/utils/product-search-params';

interface Props {
  params: Promise<{ productId: string }>;
  searchParams: Promise<SearchParams>;
}

const ProductDetailsPage = async ({ params, searchParams }: Props) => {
  const productId = +(await params).productId;

  const { variantId } = await loadProductSearchParams(searchParams);

  const productVariant = await getProductWithVariants({
    productId,
    variantId,
  });

  if (!productVariant) {
    notFound();
  }

  return (
    <main className="flex flex-col horizontal-spacing gap-10 py-4 lg:py-10 lg:gap-20">
      <div className="flex justify-between items-start gap-10">
        <ProductImages images={productVariant?.variantImages} />
        <div className="flex-1">{productVariant?.product.name}</div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
