'use client';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import nothingFound from '@assets/lottie/nothing-found.json';

const NoProductsFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 md:gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-52 h-40">
        <Lottie animationData={nothingFound} />
      </motion.div>
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          No products found!
        </h2>
        <p className="text-base md:text-lg mt-4 text-center">
          We couldn&apos;t find any products matching your search.
        </p>
      </div>
      <Button className="mt-4" asChild size="lg">
        <Link href="/collections/all">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default NoProductsFound;
