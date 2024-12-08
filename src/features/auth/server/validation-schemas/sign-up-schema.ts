import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  email: z
    .string()
    .min(1, 'This field is required')
    .email('This field must be a valid email'),
  password: z
    .string()
    .min(1, 'This field is required')
    .min(8, 'Password must be more than 8 characters'),
});
