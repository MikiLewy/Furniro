import Link from 'next/link';

import LanguageSwitcher from '@components/atoms/language-switcher';
import { getDictionary } from '@lib/get-dictionary';

import { Locale } from '../../../i18n.config';
import { Cart } from '../../../icons/cart';
import { Heart } from '../../../icons/heart';

import ClientNavbar from './navbar.client';

interface Props {
  lang: Locale;
}

const ServerNavbar = async ({ lang }: Props) => {
  const { navbar } = await getDictionary(lang);

  return (
    <nav
      className="sticky top-0 z-30 bg-white flex items-center md:justify-between py-4 horizontal-spacing border-b border-b-[#eeeeec]
      ">
      <div className="flex gap-3 md:gap-8 items-center ">
        <ClientNavbar dictionary={navbar} lang={lang} />
        <Link href={`/${lang}/`} className="text-2xl font-bold text-secondary relative z-30">
          Furniro
        </Link>
        <ul className="hidden md:flex  gap-4 relative z-30">
          <Link href={`/${lang}/products`} className="text-base font-medium cursor-pointer hover:text-primary">
            {navbar.products}
          </Link>
          <li className="text-base text-primary font-medium cursor-pointer">{navbar.sale}</li>
        </ul>
      </div>
      <div className="ml-auto flex items-center gap-5 ">
        <Heart className={`w-6 h-6 fill-none cursor-pointer `} />
        <Cart className={`w-6 h-6 cursor-pointer`} />
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default ServerNavbar;
