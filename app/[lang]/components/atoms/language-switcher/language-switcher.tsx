'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Arrow } from '@/app/[lang]/icons/arrow';
import { i18n } from '@/i18n.config';

export default function LanguageSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const currentLocale = pathName.split('/')[1]?.toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className=" px-3 lg:px-4 py-2  text-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
        onClick={toggleDropdown}>
        {currentLocale ?? ''}
        <Arrow className="w-3 h-3 ml-1.5 " />
      </button>
      {isOpen ? (
        <div className="origin-top-right absolute z-50 right-0 mt-2 overflow-hidden  rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className=" flex flex-col">
            {i18n.locales.map((locale, i) => {
              return (
                <li
                  key={locale}
                  className={`flex ${
                    currentLocale.toLowerCase() === locale.toLowerCase() ? 'bg-gray-25' : 'bg-white'
                  } hover:bg-gray-100 py-2 px-4 rounded-l ${i === 0 ? `rounded-b-none` : `rounded-t-none`} `}>
                  <Link className="flex-1 w-full" href={redirectedPathName(locale)}>
                    {locale.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
