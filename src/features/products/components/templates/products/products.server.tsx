import { prefetchProducts } from '@/features/account/products/api/lib/products.prefetch';
import { ParsedProductsSearchParams } from '@/features/account/products/lib/search-params-cache';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import ClientProductsList from './products.client';

interface Props {
  categoryId: number | undefined;
  parsedSearchParams: ParsedProductsSearchParams;
}

const ServerProducts = async ({ categoryId, parsedSearchParams }: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <HydrationBoundaryProvider
        prefetchDataFunctions={[
          queryClient =>
            prefetchProducts(queryClient, categoryId, parsedSearchParams),
        ]}>
        <ClientProductsList categoryId={categoryId} />
      </HydrationBoundaryProvider>
    </section>
  );
};

export default ServerProducts;
