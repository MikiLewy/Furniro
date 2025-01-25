import { z } from 'zod';

export const createOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  paymentIntentId: z.string(),
  products: z.array(
    z.object({
      id: z.number(),
      variantId: z.number(),
      quantity: z.number(),
    }),
  ),
});
