import { Locale } from '@/i18n.config';
import AboutUs from '@components/organisms/home/about-us';
import CreatorsTopPicks from '@components/organisms/home/creators-top-picks/creators-top-picks';
import Hero from '@components/organisms/home/hero';
import OurProducts from '@components/organisms/home/recommended-products';

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
        <OurProducts lang={lang} />
        <AboutUs lang={lang} />
        <CreatorsTopPicks lang={lang} />
      </main>
    </div>
  );
}
