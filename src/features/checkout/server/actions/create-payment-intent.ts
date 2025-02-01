'use server';

import { createSafeActionClient } from 'next-safe-action';
import Stripe from 'stripe';

import { auth } from '@/auth';
import { convertPriceToCents } from '@/utils/convert-price-to-cents';

import { paymentIntentSchema } from '../validation-schema/payment-intent-schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const action = createSafeActionClient();

export const createPaymentIntent = action
  .schema(paymentIntentSchema)
  .action(async ({ parsedInput: { cart } }) => {
    const session = await auth();

    const calculatedOrderTotalPriceInCents = cart.reduce((acc, item) => {
      const price = item.price * item.quantity;

      const priceInCents = convertPriceToCents(price);

      return acc + priceInCents;
    }, 0);

    if (!session) {
      return { error: 'Please login to continue' };
    }

    if (!calculatedOrderTotalPriceInCents) {
      return { error: 'No products to checkout' };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculatedOrderTotalPriceInCents,
      currency: 'EUR',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    if (!paymentIntent) {
      return { error: 'Failed to create payment intent' };
    }

    return {
      success: {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        email: session.user.email,
      },
    };
  });
