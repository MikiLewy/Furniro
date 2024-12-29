import { z } from 'zod';

import { CategoryIcon } from '../../api/types/category';

export const updateCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'This field is required'),
  image: z.string().min(1, 'This field is required'),
  icon: z.nativeEnum(CategoryIcon, { message: 'This field is required' }),
});
