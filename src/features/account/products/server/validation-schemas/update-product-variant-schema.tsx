import { z } from 'zod';

export const updateProductVariantSchema = z.object({
  id: z.number().optional(),
  productId: z.number().optional(),
  name: z.string().min(1, { message: 'This field is required' }),
  color: z.string().min(3, { message: 'This field is required' }),
  tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
  variantImages: z
    .array(
      z.object({
        url: z.string().refine(url => url.search('blob:') !== 0, {
          message: 'Please wait for the image to upload',
        }),
        size: z.number().optional(),
        key: z.string().optional(),
        id: z.number().optional(),
        order: z.number().optional(),
        name: z.string().optional(),
      }),
    )
    .min(1, { message: 'At least one image is required' }),
});
