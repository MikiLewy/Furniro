import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'This field is required'),
  image: z.string().min(1, 'This field is required'),
  icon: z.string().min(1, 'This field is required'),
});
