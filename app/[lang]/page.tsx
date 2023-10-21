import { getDictionary } from '@/app/[lang]/lib/get-dictionary';
import { Locale } from '@/i18n.config';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: Params) {
  const { home } = await getDictionary(lang);

  return (
    <div>
      <h1>{home.title}</h1>
    </div>
  );
}
