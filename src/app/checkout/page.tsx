'use client';

import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Logo from '@/components/atoms/logo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCartStore } from '@/features/cart/store/cart-store';
import CheckoutForm from '@/features/checkout/components/organisms/checkout-form';
import getStripe from '@/features/checkout/utils/get-stripe';
import { convertPriceToCents } from '@/utils/convert-price-to-cents';

const stripePromise = getStripe();

const CheckoutPage = () => {
  const session = useSession();

  if (!session.data) {
    redirect('/');
  }
  const totalPrice = useCartStore(state => state.totalPrice);

  const setIsCartSheetOpen = useCartStore(state => state.setIsCartSheetOpen);

  const options: StripeElementsOptions = {
    appearance: {
      theme: 'stripe',
    },
    mode: 'payment',
    amount: convertPriceToCents(totalPrice),
    currency: 'eur',
  };

  return (
    <div className="flex flex-col lg:gap-5 min-h-full">
      <Logo />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild onClick={() => setIsCartSheetOpen(true)}>
              <Link href="/">Cart</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-2 lg:gap-4">
          <h2 className="text-2xl font-medium">Checkout</h2>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <div className="flex-1 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
