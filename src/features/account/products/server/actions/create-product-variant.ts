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
import { products } from '../../schema/products';
import { createProductVariantSchema } from '../validation-schemas/create-product-variant-schema';

const action = createSafeActionClient();

// const client = algoliasearch(
//   process.env.NEXT_PUBLIC_ALGOLIA_ID!,
//   process.env.NEXT_PUBLIC_ALGOLIA_WRITE_KEY!,
// );

export const createProductVariant = action
  .schema(createProductVariantSchema)
  .action(
    async ({
      parsedInput: { color, name, tags, variantImages, productId },
    }) => {
      try {
        const createdProductVariant = await db
          .insert(productVariants)
          .values({
            color,
            name,
            productId,
          })
          .returning();

        const product = await db.query.products.findFirst({
          where: eq(products.id, productId || 0),
        });

        if (createdProductVariant?.[0]?.id) {
          await db.insert(variantTags).values(
            tags.map(tag => ({
              variantId: createdProductVariant[0].id,
              tag: tag,
            })),
          );
          await db.insert(variantImagesTable).values(
            variantImages.map((image, index) => ({
              url: image.url || '',
              size: image.size || 0,
              name: image.name || '',
              order: index,
              variantId: createdProductVariant[0].id,
            })),
          );
        }
        // if (product) {
        //   await client.saveObject({
        //     indexName: 'products',
        //     body: {
        //       objectID: createdProductVariant[0].id,
        //       id: productId,
        //       title: product?.name,
        //       price: product?.price,
        //       variantName: createdProductVariant[0].name,
        //       color,
        //       tags,
        //       variantImages: variantImages[0].url,
        //     },
        //   });
        // }

        revalidatePath('/content/products');
        return { success: 'Successfully created product variant' };
      } catch (err) {
        return { error: 'An error occurred while creating product variant' };
      }
    },
  );
