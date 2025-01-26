'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/features/cart/store/cart-store';
import checkoutSuccess from '@assets/lottie/checkout-success.json';

const CheckoutSuccess = () => {
  const clearCart = useCartStore(state => state.clearCart);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-52 h-40">
        <Lottie animationData={checkoutSuccess} />
      </motion.div>
      <div>
        <h2 className="text-4xl font-bold">Order Confirmed!</h2>
        <p className="text-lg mt-4 text-center">Thank you for your purchase.</p>
      </div>
      <Button className="mt-4" onClick={clearCart} asChild size="lg">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
