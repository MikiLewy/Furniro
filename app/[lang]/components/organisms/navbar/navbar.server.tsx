import Image from 'next/image';

import { Locale } from '@/i18n.config';
import cart from '@assets/icons/cart.svg';
import logo from '@assets/icons/logo.svg';
import LanguageSwitcher from '@components/atoms/language-switcher/language-switcher';
import { getDictionary } from '@lib/get-dictionary';

import ClientNavbar from './navbar.client';

interface Props {
  lang: Locale;
}

const ServerNavbar = async ({ lang }: Props) => {
  const { navbar } = await getDictionary(lang);

  return (
    <nav className="flex relative z-50 items-center md:justify-between  py-7 px-4 max-w-7xl mx-auto">
      <div className="flex gap-1 relative  z-10">
        <Image src={logo} alt="furniro logo" className="h-auto w-7 md:w-10 lg:w-14" />
        <h2 className="text-2xl lg:text-3xl font-bold">Furniro</h2>
      </div>
      <ul className="hidden md:flex md:gap-8 lg:gap-16">
        <li className="text-base font-medium cursor-pointer">{navbar.home}</li>
        <li className="text-base font-medium cursor-pointer">{navbar.products}</li>
        <li className="text-base font-medium cursor-pointer">{navbar.blog}</li>
        <li className="text-base font-medium cursor-pointer">{navbar.contact}</li>
      </ul>
      <div className="flex ml-auto  mr-5 items-center relative z-50 gap-5 md:mx-0 lg:gap-5">
        <LanguageSwitcher />
        <Image src={cart} alt="cart" className={`w-6 h-auto cursor-pointer`} />
      </div>
      <ClientNavbar dictionary={navbar} />
    </nav>
  );
};

export default ServerNavbar;
