import { Locale } from '@/i18n.config';
import { getDictionary } from '@lib/get-dictionary';
import { PRODUCTS_CATEGORIES } from '@mocks/products-categories';

import SectionTitle from '../../../atoms/section-title/section-title';

import ClientBrowseTheRange from './browse-the-range.client';

interface Props {
  lang: Locale;
}

const ServerBrowseTheRange = async ({ lang }: Props) => {
  const {
    home: { browseTheRange },
  } = await getDictionary(lang);

  return (
    <section className="px-4 my-12 xl:px-16">
      <SectionTitle title={browseTheRange.title} subtitle={browseTheRange.description} />
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5 mt-4 md:mt-12 ">
        {PRODUCTS_CATEGORIES?.map(({ id, category, img }) => <ClientBrowseTheRange key={id} category={category} img={img} />)}
      </div>
    </section>
  );
};

export default ServerBrowseTheRange;
