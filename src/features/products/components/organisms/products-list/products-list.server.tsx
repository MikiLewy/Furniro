import { prefetchProducts } from '@features/products/api/lib/products.prefetch';

import HydrationBoundaryProvider from '../../../../../providers/hydration-boundary-provider';

import ClientProductsList from './products-list.client';

const ServerProductsList = async () => {
  return (
    <main>
      <HydrationBoundaryProvider
        prefetchDataFunctions={[queryClient => prefetchProducts(queryClient)]}>
        <ClientProductsList />
      </HydrationBoundaryProvider>
    </main>
  );
};

export default ServerProductsList;
