'use client';

import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import NavbarItem from '@/components/atoms/navbar-item';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/features/account/categories/api/types/category';
import { categoriesTypes } from '@/features/account/categories/constants/categories-types';

interface Props {
  categories: Category[];
}

const ClientNavbar = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();

  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.button
        initial="hide"
        animate={isOpen ? 'show' : 'hide'}
        onClick={handleToggle}
        className="flex flex-col space-y-1 relative z-10">
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
              className="fixed top-0 left-0 bottom-0 right-0 md:right-auto md:min-w-[400px] px-1 md:px-3 lg:-ml-2 lg:pl-0 lg:pr-5 pt-[73px] flex flex-col justify-start space-y-10 lg:left-auto">
              <div className="bg-white h-full w-full lg:pr-5 py-2">
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
                  <NavbarItem
                    href={`/collections/all`}
                    title="All products"
                    RouteIcon={ShoppingBag}
                    isActive={pathname.includes(`/collections/all`)}
                  />
                  <div className="flex flex-col gap-1">
                    {categories?.map(({ id, name, type }) => {
                      const RouteIcon = categoriesTypes[type].icon;

                      return (
                        <NavbarItem
                          key={id}
                          href={`/collections/${type}`}
                          title={name}
                          RouteIcon={RouteIcon}
                          isActive={pathname.includes(`/collections/${type}`)}
                        />
                      );
                    })}
                  </div>
                  <Separator className="my-2" />
                  <NavbarItem
                    href={session?.data?.user ? `/orders` : '/login'}
                    title="Account"
                    RouteIcon={User}
                    isActive={pathname.includes(`/orders`)}
                  />
                  <NavbarItem
                    href={`/wishlist`}
                    title="Wishlist"
                    RouteIcon={Heart}
                    isActive={pathname.includes(`/wishlist`)}
                  />
                </motion.ul>
              </div>
            </motion.div>
          </MotionConfig>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ClientNavbar;
