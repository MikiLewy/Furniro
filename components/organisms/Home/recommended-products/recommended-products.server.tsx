import { Locale } from '@/i18n.config';
import { supabase } from '@/lib/init-supabase';
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

  const { data: products, error } = await supabase.from('products').select('*');

  return (
    <section className="horizontal-spacing">
      <SectionTitle title={recommendedProducts.title} />
      <div className="mt-5">
        <ClientRecommendedProducts products={products} />
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
