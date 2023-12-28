'use client';

import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { routes } from '@/constants/routes';
import { Locale } from '@/i18n.config';
import { NavbarDictionaryKeys } from '@/types/interfaces/NavbarDictionaryKeys';

interface Props {
  dictionary: NavbarDictionaryKeys;
  lang: Locale;
}

const ClientNavbar = ({ dictionary, lang }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <motion.button initial="hide" animate={isOpen ? 'show' : 'hide'} onClick={handleToggle} className="flex flex-col space-y-1 relative z-10">
        <motion.span
          variants={{
            hide: {
              rotate: 0,
            },
            show: {
              rotate: 45,
              y: 6,
            },
          }}
          className="w-6 bg-black h-0.5 block"></motion.span>
        <motion.span
          variants={{
            hide: {
              opacity: 1,
            },
            show: {
              opacity: 0,
            },
          }}
          className="w-6 bg-black h-0.5 block"></motion.span>
        <motion.span
          variants={{
            hide: {
              rotate: 0,
            },
            show: {
              rotate: -45,
              y: -6,
            },
          }}
          className="w-6 bg-black h-0.5 block"></motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen ? (
          <MotionConfig
            transition={{
              type: 'spring',
              bounce: 0.1,
            }}>
            <motion.div
              key="mobile-nav"
              variants={{
                hide: {
                  x: '-100%',
                  transition: {
                    type: 'spring',
                    bounce: 0.1,
                  },
                },
                show: {
                  x: '0%',
                  transition: {
                    type: 'spring',
                    bounce: 0.1,
                  },
                },
              }}
              initial="hide"
              animate="show"
              exit="hide"
              className="fixed top-0 left-0 bottom-0 right-0 md:right-auto  md:min-w-[400px] px-1  xl:px-8  bg-white  pt-20 flex flex-col justify-start space-y-10 ">
              <motion.ul
                variants={{
                  hide: {
                    opacity: 0,
                  },
                  show: {
                    opacity: 1,
                  },
                }}
                className="flex flex-col gap-1">
                {routes.map(({ titleKey, href, icon: RouteIcon, primary }) => (
                  <Link
                    key={href}
                    href={`/${lang}${href}`}
                    className={`flex items-center gap-2 text-base px-4 md:px-8 py-4 rounded-3xl ${
                      primary ? 'text-primary' : 'text-secondary'
                    } font-medium cursor-pointer ${
                      pathname === `/${lang}${href}` ? (primary ? 'bg-primary-outlinedHover' : 'bg-gray-50') : 'bg-transparent'
                    } ${primary ? 'hover:bg-primary-outlinedHover' : 'hover:bg-gray-50'}  transition-colors duration-500`}>
                    <div className="w-5 h-5 stroke-gray-300">
                      <RouteIcon />
                    </div>
                    {dictionary[titleKey as keyof NavbarDictionaryKeys]}
                  </Link>
                ))}
              </motion.ul>
            </motion.div>
          </MotionConfig>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ClientNavbar;
