import { Locale } from '@/i18n.config';
import { getDictionary } from '@lib/get-dictionary';

import SectionTitle from '../../../atoms/section-title/section-title';

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
        <ClientRecommendedProducts />
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
