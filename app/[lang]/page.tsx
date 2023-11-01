import { Locale } from '@/i18n.config';

import Hero from './components/organisms/Home/hero';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: Params) {
  return (
    <div>
      <Hero lang={lang} />
    </div>
  );
}
