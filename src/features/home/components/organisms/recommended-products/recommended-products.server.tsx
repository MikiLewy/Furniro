import SectionTitle from '@components/atoms/section-title';
import { prefetchRecommendedProducts } from '@features/home/api/lib/recommended-products.prefetch';

import HydrationBoundaryProvider from '../../../../../providers/hydration-boundary-provider';

import ClientRecommendedProducts from './recommended-products.client';

const ServerRecommendedProducts = () => {
  return (
    <section className="horizontal-spacing">
      <SectionTitle title="Recommended products" />
      <div className="mt-5">
        <HydrationBoundaryProvider
          prefetchDataFunctions={[
            queryClient => prefetchRecommendedProducts(queryClient),
          ]}>
          <ClientRecommendedProducts />
        </HydrationBoundaryProvider>
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
