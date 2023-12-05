import { Locale } from '@/i18n.config';

interface Params {
  params: {
    lang: Locale;
  };
}

export default async function Products({ params: { lang } }: Params) {
  return (
    <div>
      <main className="flex flex-col gap-10 py-10 lg:py-20 lg:gap-20">
        <h1>Collections</h1>
      </main>
    </div>
  );
}
