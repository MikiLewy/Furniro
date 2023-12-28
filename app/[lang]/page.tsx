import { Locale } from '@/i18n.config';
import AboutUs from '@components/home/about-us';
import CreatorsTopPicks from '@components/home/creators-top-picks/creators-top-picks';
import Hero from '@components/home/hero';
import RecommendedProducts from '@components/home/recommended-products/index';

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
