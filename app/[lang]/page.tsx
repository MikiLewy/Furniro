import { Locale } from '@/i18n.config';

import BrowseTheRange from './components/organisms/Home/browse-the-range';
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
      <main className="max-w-7xl mx-auto">
        <BrowseTheRange lang={lang} />
      </main>
    </div>
  );
}
