import { Locale } from '@/i18n.config';
import Header from '@components/organisms/products/header/header';
import ProductsList from '@components/organisms/products/products-list';

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
