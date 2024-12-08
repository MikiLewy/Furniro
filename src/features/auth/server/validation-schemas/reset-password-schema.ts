import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'This field is required')
    .email('This field must be a valid email'),
});
