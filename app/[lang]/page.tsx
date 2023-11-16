import { Locale } from '@/i18n.config';

import AboutUs from './components/organisms/Home/about-us';
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
      <main className="flex flex-col gap-5 py-10 lg:py-20 lg:gap-10">
        <OurProducts lang={lang} />
        <AboutUs lang={lang} />
      </main>
    </div>
  );
}
