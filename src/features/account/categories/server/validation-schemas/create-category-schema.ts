import { z } from 'zod';

import { CategoryType } from '../../api/types/category';

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  categoryImage: z.string().min(1, { message: 'This field is required' }),
  mainImage: z.string().min(1, { message: 'This field is required' }),
  subtitle: z.string().min(1, { message: 'This field is required' }),
  description: z.string().min(1, { message: 'This field is required' }),
  type: z.nativeEnum(CategoryType, { message: 'This field is required' }),
});
