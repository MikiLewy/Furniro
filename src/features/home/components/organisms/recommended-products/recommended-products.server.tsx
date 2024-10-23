import { prefetchRecommendedProducts } from '@features/home/api/lib/recommended-products.prefetch';

import SectionTitle from '@components/atoms/section-title';
import { getDictionary } from '@lib/get-dictionary';

import { Locale } from '../../../../../i18n.config';
import HydrationBoundaryProvider from '../../../../../providers/hydration-boundary-provider';

import ClientRecommendedProducts from './recommended-products.client';

interface Props {
  lang: Locale;
}

const ServerRecommendedProducts = async ({ lang }: Props) => {
  const {
    home: { recommendedProducts },
  } = await getDictionary(lang);

  return (
    <section className="horizontal-spacing">
      <SectionTitle title={recommendedProducts.title} />
      <div className="mt-5">
        <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchRecommendedProducts(queryClient)]}>
          <ClientRecommendedProducts locale={lang} />
        </HydrationBoundaryProvider>
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
