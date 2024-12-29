import { relations } from 'drizzle-orm';
import { pgTable, real, serial, text } from 'drizzle-orm/pg-core';

import { products } from '@/features/account/products/schema/products';

import { timestamps } from '../../../../db/constants/timestamps';

export const productVariants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  color: text('color').notNull(),
  name: text('name').notNull(),
  productId: serial('productId').references(() => products.id, {
    onDelete: 'cascade',
  }),
  ...timestamps,
});

export const variantImages = pgTable('variant_images', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  size: real('size').notNull(),
  name: text('name').notNull(),
  order: real('order').notNull(),
  variantId: serial('variantId').references(() => productVariants.id, {
    onDelete: 'cascade',
  }),
});

export const variantTags = pgTable('variant_tags', {
  id: serial('id').primaryKey(),
  tag: text('tag').notNull(),
  variantId: serial('variantId').references(() => productVariants.id, {
    onDelete: 'cascade',
  }),
});

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
      relationName: 'product_variants',
    }),
    variantImages: many(variantImages, { relationName: 'variant_images' }),
    variantTags: many(variantTags, { relationName: 'variant_tags' }),
  }),
);

export const variantImagesRelations = relations(variantImages, ({ one }) => ({
  variant: one(productVariants, {
    fields: [variantImages.variantId],
    references: [productVariants.id],
    relationName: 'variant_images',
  }),
}));

export const variantTagsRelations = relations(variantTags, ({ one }) => ({
  variant: one(productVariants, {
    fields: [variantTags.variantId],
    references: [productVariants.id],
    relationName: 'variant_tags',
  }),
}));
