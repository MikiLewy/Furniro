'use client';

import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useState } from 'react';

interface Props {
  dictionary: {
    home: string;
    products: string;
    blog: string;
    contact: string;
  };
}

const ClientNavbar = ({ dictionary }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="md:hidden">
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
              className="fixed inset-0 bg-white p-6 pt-28 flex flex-col justify-start space-y-10 lg:hidden">
              <motion.ul
                variants={{
                  hide: {
                    opacity: 0,
                  },
                  show: {
                    opacity: 1,
                  },
                }}
                className="list-none space-y-6">
                <li className="text-3xl font-medium cursor-pointer">{dictionary.home}</li>
                <li className="text-3xl font-medium cursor-pointer">{dictionary.products}</li>
                <li className="text-3xl font-medium cursor-pointer">{dictionary.blog}</li>
                <li className="text-3xl font-medium cursor-pointer">{dictionary.contact}</li>
              </motion.ul>
            </motion.div>
          </MotionConfig>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ClientNavbar;
