import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'This field is required'),
  description: z
    .string()
    .min(40, { message: 'Description must be at least 40 characters long' }),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, 'This field is required')
    .positive('This must be a positive number'),
  categoryId: z.string().min(1, 'This field is required'),
});
