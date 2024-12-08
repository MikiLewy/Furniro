import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'This field is required')
    .email('This field must be a valid email'),
  password: z
    .string()
    .min(1, 'This field is required')
    .min(8, 'Password must be more than 8 characters'),
});
