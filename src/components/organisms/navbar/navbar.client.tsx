'use client';

import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import NavbarItem from '@/components/atoms/navbar-item';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Category } from '@/features/account/categories/api/types/category';
import { categoriesTypes } from '@/features/account/categories/constants/categories-types';
import { cn } from '@/lib/utils';

interface Props {
  categories: Category[];
}

const ClientNavbar = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

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
              className="fixed top-0 left-0 bottom-0 right-0 md:right-auto  md:min-w-[400px] px-1 md:px-3  lg:px-5  bg-white  pt-20 flex flex-col justify-start space-y-10">
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
                <Collapsible defaultOpen className="group">
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        `flex items-center gap-3 text-sm px-4 py-3 rounded-3xl text-secondary-darker cursor-pointer bg-transparent hover:bg-gray-50  transition-colors duration-500`,
                      )}>
                      <div className="stroke-gray-300 ">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      Products
                      <ChevronDown className="h-5 w-5 ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />
                      <ChevronUp className="h-5 w-5 ml-auto shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1">
                    <div className="flex flex-col gap-1">
                      {categories?.map(({ id, name, type }) => {
                        const RouteIcon = categoriesTypes[type].icon;

                        return (
                          <NavbarItem
                            key={id}
                            href={`/collections/${type}`}
                            title={name}
                            RouteIcon={RouteIcon}
                            isActive={pathname === `/collections/${type}`}
                          />
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.ul>
            </motion.div>
          </MotionConfig>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ClientNavbar;
