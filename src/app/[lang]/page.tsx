import AboutUs from '@features/home/components/organisms/about-us';
import CreatorsTopPicks from '@features/home/components/organisms/creators-top-picks/creators-top-picks';
import Hero from '@features/home/components/organisms/hero';
import RecommendedProducts from '@features/home/components/organisms/recommended-products';

import { Locale } from '../../src/i18n.config';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: Params) {
  return (
    <div>
      <Hero lang={lang} />
      <main className="flex flex-col gap-10 py-10 lg:py-20 lg:gap-20">
        <RecommendedProducts lang={lang} />
        <AboutUs lang={lang} />
        <CreatorsTopPicks lang={lang} />
      </main>
    </div>
  );
}
