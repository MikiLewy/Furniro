import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import ProductDescription from '@/components/molecules/product/product-description';
import { usePrefetchProduct } from '@/hooks/api/products/use-prefetch-product';
import { Locale } from '@/i18n.config';

interface Props {
  params: {
    lang: Locale;
    id: string;
  };
}

const ProductDetails = async ({ params: { id, lang } }: Props) => {
  const queryClient = new QueryClient();

  await usePrefetchProduct(queryClient, +id);

  return (
    <div className="grid grid-cols-1 horizontal-spacing gap-5 py-4 md:grid-cols-2 xl:grid-cols-3 ">
      <div className="md:col-start-1 md:col-end-2 xl:col-end-3 bg-indigo-300">product{id}</div>
      <div className="-order-1 md:order-1 md:col-start-2 md:col-end-3 xl:col-start-3 xl:col-end-4 py-2">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductDescription id={+id} locale={lang} />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default ProductDetails;
