'use server';

import { createSafeActionClient } from 'next-safe-action';

import { auth } from '@/auth';
import { db } from '@/db';
import { orderProduct, orders } from '@/db/schema';

import { createOrderSchema } from '../validation-schemas/create-order-schema';

const actionClient = createSafeActionClient();

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(
    async ({ parsedInput: { products, status, total, paymentIntentId } }) => {
      const session = await auth();

      if (!session) {
        return { error: 'Please login to continue' };
      }

      const order = await db
        .insert(orders)
        .values({
          status,
          total,
          paymentIntentID: paymentIntentId,
          userId: session?.user?.id,
        })
        .returning();

      products.map(async product => {
        return await db.insert(orderProduct).values({
          orderID: order?.[0]?.id,
          productID: product.id,
          productVariantID: product.variantId,
          quantity: product.quantity,
        });
      });

      return {
        success: 'Successfully created order',
      };
    },
  );
