import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { usePrefetchProducts } from '@/hooks/api/products/usePrefetchProducts';
import { Locale } from '@/i18n.config';

import ClientProductsList from './products-list.client';

interface Props {
  lang: Locale;
}

const ServerProductsList = async ({ lang }: Props) => {
  const queryClient = new QueryClient();

  await usePrefetchProducts(queryClient);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientProductsList locale={lang} />
      </HydrationBoundary>
    </main>
  );
};

export default ServerProductsList;
