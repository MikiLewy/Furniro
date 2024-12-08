import { z } from 'zod';

export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'This field is required')
      .min(8, 'Password must be more than 8 characters'),
    confirmPassword: z.string().min(1, 'This field is required'),
    token: z.string().nullable().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
