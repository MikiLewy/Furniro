import { Locale } from '@/i18n.config';

import Hero from './components/organisms/Home/hero';
import OurProducts from './components/organisms/Home/recommended-products';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: Params) {
  return (
    <div>
      <Hero lang={lang} />
      <main>
        <OurProducts lang={lang} />
      </main>
    </div>
  );
}
