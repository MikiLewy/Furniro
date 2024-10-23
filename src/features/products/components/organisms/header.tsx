import Image from 'next/image';

import productsHeaderImg from '@assets/images/products-page.webp';
import SectionTitle from '@components/atoms/section-title';
import { getDictionary } from '@lib/get-dictionary';

import { Locale } from '../../../../i18n.config';

interface Props {
  lang: Locale;
}

const Header = async ({ lang }: Props) => {
  const { products } = await getDictionary(lang);

  return (
    <header className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <Image
        src={productsHeaderImg}
        alt={products.headerImgAlt}
        className="rounded-3xl max-h-[300px] object-cover object-bottom lg:object-center lg:max-h-[400px] 2xl:max-h-[600px] 2xl:basis-2/4"
      />
      <div className="flex flex-col justify-center gap-4 basis-3/4 2xl:basis-2/4">
        <SectionTitle title={products.title} />
        <p className="text-sm lg:text-base leading-7">{products.description}</p>
      </div>
    </header>
  );
};

export default Header;
