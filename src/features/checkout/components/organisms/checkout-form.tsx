'use client';

import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'nextjs-toploader/app';
import { FormEvent, useState } from 'react';

import { LoadingButton } from '@/components/atoms/loading-button';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
import { useCartStore } from '@/features/cart/store/cart-store';

import { useCreateOrder } from '../../hooks/action/use-create-order';
import { useCreatePaymentIntent } from '../../hooks/action/use-create-payment-intent';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const cartProducts = useCartStore(state => state.products);

  const totalPrice = useCartStore(state => state.totalPrice);

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { executeAsync: executeCreatePaymentIntent } = useCreatePaymentIntent();

  const onSuccessCreateOrder = () => {
    setIsLoading(false);
    setMessage(null);
    router.push('/checkout/success');
  };

  const { execute: executeCreateOrder } = useCreateOrder(onSuccessCreateOrder);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setMessage(submitError.message || '');
      setIsLoading(false);
      return;
    }

    const cart = cartProducts.map(product => ({
      id: product.productId,
      variantId: product.variantId,
      price: product.price,
      quantity: product.quantity,
    }));

    const result = await executeCreatePaymentIntent({
      cart,
    });

    if (result) {
      const data = result?.data;

      if (data?.error) {
        setMessage(data.error);
        setIsLoading(false);
      }

      if (data?.success) {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: data.success.clientSecret || '',
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
            receipt_email: data.success.email || '',
          },
          redirect: 'if_required',
        });

        if (
          error?.type === 'card_error' ||
          error?.type === 'validation_error'
        ) {
          setMessage(error.message || '');
          return;
        } else if (error) {
          setMessage('An unexpected error occurred.');
          return;
        }

        executeCreateOrder({
          total: totalPrice || 0,
          status: 'pending',
          products: cart,
          paymentIntentId: data.success.paymentIntentId,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 flex-1">
      <PaymentElement
        id="payment-element"
        options={{
          layout: 'tabs',
        }}
      />
      <AddressElement options={{ mode: 'shipping' }} />
      <LoadingButton
        disabled={isLoading || !stripe || !elements}
        id="submit"
        size="lg"
        loading={isLoading}
        className="self-end">
        Pay now
      </LoadingButton>
      {message ? (
        <SubmittedFormMessage message={message} variant="error" />
      ) : null}
    </form>
  );
}
