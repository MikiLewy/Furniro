'use client';

import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

import CheckoutForm from '@/features/checkout/components/organisms/checkout-form';
import CompletePage from '@/features/checkout/components/organisms/complete-page';
import getStripe from '@/features/checkout/utils/get-stripe';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = getStripe();

export default function Page() {
  const [clientSecret, setClientSecret] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setConfirmed(
      !!new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret',
      ),
    );
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log({ clientSecret });

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
}
