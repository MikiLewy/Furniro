import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { usePrefetchRecommendedProducts } from '@/hooks/api/products/use-prefetch-recommended-products';
import { Locale } from '@/i18n.config';
import SectionTitle from '@components/atoms/section-title/section-title';
import { getDictionary } from '@lib/get-dictionary';

import ClientRecommendedProducts from './recommended-products.client';

interface Props {
  lang: Locale;
}

const ServerRecommendedProducts = async ({ lang }: Props) => {
  const {
    home: { recommendedProducts },
  } = await getDictionary(lang);

  const queryClient = new QueryClient();

  await usePrefetchRecommendedProducts(queryClient);

  return (
    <section className="horizontal-spacing">
      <SectionTitle title={recommendedProducts.title} />
      <div className="mt-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ClientRecommendedProducts locale={lang} />
        </HydrationBoundary>
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
