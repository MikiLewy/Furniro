'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createSafeActionClient } from 'next-safe-action';

import { db } from '@/db';

import {
  productVariants,
  variantTags,
  variantImages as variantImagesTable,
} from '../../schema/product-variants';
import { updateProductVariantSchema } from '../validation-schemas/update-product-variant-schema';

const action = createSafeActionClient();

// const client = algoliasearch(
//   process.env.NEXT_PUBLIC_ALGOLIA_ID!,
//   process.env.NEXT_PUBLIC_ALGOLIA_WRITE_KEY!,
// );

export const updateProductVariant = action
  .schema(updateProductVariantSchema)
  .action(
    async ({
      parsedInput: { id, color, name, tags, variantImages, productId },
    }) => {
      try {
        if (!id) {
          return { error: 'Product variant not found' };
        }

        const editedVariant = await db
          .update(productVariants)
          .set({
            color,
            name,
            updated_at: new Date(),
            productId,
          })
          .where(eq(productVariants.id, id))
          .returning();

        if (editedVariant) {
          await db
            .delete(variantTags)
            .where(eq(variantTags.variantId, editedVariant[0].id));

          await db.insert(variantTags).values(
            tags.map(tag => ({
              variantId: editedVariant[0].id,
              tag: tag,
            })),
          );

          await db
            .delete(variantImagesTable)
            .where(eq(variantImagesTable.variantId, editedVariant[0].id));
          await db.insert(variantImagesTable).values(
            variantImages.map((image, index) => ({
              url: image.url || '',
              size: image.size || 0,
              name: image.name || '',
              order: index,
              variantId: editedVariant[0].id,
            })),
          );
        }

        // await client.partialUpdateObject({
        //   indexName: 'products',
        //   objectID: editedVariant[0].id.toString(),
        //   attributesToUpdate: {
        //     objectID: editedVariant[0].id,
        //     id: productId,
        //     productType,
        //     color,
        //     tags,
        //     variantImages: variantImages[0].url,
        //   },
        // });

        revalidatePath('/content/products');
        return { success: 'Successfully updated product variant' };
      } catch (err) {
        return { error: 'An error occurred while updating product variant' };
      }
    },
  );
