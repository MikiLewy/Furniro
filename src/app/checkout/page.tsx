'use client';

import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Link from 'next/link';

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
import CheckoutProducts from '@/features/checkout/components/organisms/checkout-products';
import getStripe from '@/features/checkout/utils/get-stripe';
import { convertPriceToCents } from '@/utils/convert-price-to-cents';

const stripePromise = getStripe();

const CheckoutPage = () => {
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
    <div className="flex-1 w-full flex flex-col gap-4 lg:flex-row lg:gap-8">
      <div className="flex-1 flex flex-col gap-4 lg:gap-6 py-4 lg:py-10 px-4 md:px-6 lg:px-8">
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
        <div className="flex-1 flex flex-col gap-4 lg:gap-6 ">
          <h2 className="text-2xl font-medium">Checkout</h2>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      <CheckoutProducts />
    </div>
  );
};

export default CheckoutPage;
