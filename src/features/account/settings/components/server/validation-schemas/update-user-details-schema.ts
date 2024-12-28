import { z } from 'zod';

export const updateUserDetailsSchema = z
  .object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email('Invalid email address')),
    password: z.optional(
      z.union([
        z.literal(''),
        z.string().min(8, 'Password must be more than 8 characters'),
      ]),
    ),
    confirmPassword: z.optional(z.string()),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
