import Header from '@features/products/components/organisms/header';
import ProductsList from '@features/products/components/organisms/products-list';
import { Locale } from '../../../i18n.config';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Products({ params: { lang } }: Params) {
  return (
    <main className="flex flex-col horizontal-spacing gap-10 py-4 lg:py-10 lg:gap-20">
      <Header lang={lang} />
      <ProductsList lang={lang} />
    </main>
  );
}
