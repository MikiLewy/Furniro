import { prefetchProducts } from '@features/products/api/lib/products.prefetch';

import { Locale } from '../../../../../i18n.config';
import HydrationBoundaryProvider from '../../../../../providers/hydration-boundary-provider';

import ClientProductsList from './products-list.client';

interface Props {
  lang: Locale;
}

const ServerProductsList = async ({ lang }: Props) => {
  return (
    <main>
      <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchProducts(queryClient)]}>
        <ClientProductsList locale={lang} />
      </HydrationBoundaryProvider>
    </main>
  );
};

export default ServerProductsList;
