import { z } from 'zod';

export const paymentIntentSchema = z.object({
  cart: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
      price: z.number(),
      variantId: z.number(),
    }),
  ),
});
