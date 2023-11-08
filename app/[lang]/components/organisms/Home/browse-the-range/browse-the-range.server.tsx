import { Locale } from '@/i18n.config';
import { getDictionary } from '@lib/get-dictionary';
import { PRODUCTS_CATEGORIES } from '@mocks/products-categories';

import ClientBrowseTheRange from './browse-the-range.client';

interface Props {
  lang: Locale;
}

const ServerBrowseTheRange = async ({ lang }: Props) => {
  const {
    home: { browseTheRange },
  } = await getDictionary(lang);

  return (
    <section className="my-12 px-4">
      <header className="flex flex-col gap-2 items-start md:items-center justify-center mb-4 md:mb-12">
        <h2 className="font-bold text-2xl md:text-4xl text-gray-800">{browseTheRange.title}</h2>
        <p className="text-500 text-base md:text-xl">{browseTheRange.description}</p>
      </header>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5 ">
        {PRODUCTS_CATEGORIES?.map(({ id, category, img }) => <ClientBrowseTheRange key={id} category={category} img={img} />)}
      </div>
    </section>
  );
};

export default ServerBrowseTheRange;
