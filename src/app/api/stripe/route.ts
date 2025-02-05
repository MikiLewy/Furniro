import { eq } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/db';
import { orders } from '@/db/schema';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia',
  });
  const sig = req.headers.get('stripe-signature') || '';
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  // Read the request body as text
  const reqText = await req.text();
  // Convert the text to a buffer
  const reqBuffer = Buffer.from(reqText);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
  } catch (err) {
    const apiError = err as { message: string };

    return new NextResponse(`Webhook Error: ${apiError.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const retrieveOrder = await stripe.paymentIntents.retrieve(
        event.data.object.id,
        { expand: ['latest_charge'] },
      );

      const charge = retrieveOrder.latest_charge as Stripe.Charge;

      await db
        .update(orders)
        .set({
          status: 'succeeded',
          receiptURL: charge.receipt_url,
        })
        .where(eq(orders.paymentIntentID, event.data.object.id));

      break;
    }

    default:
  }

  return new Response('ok', { status: 200 });
}
