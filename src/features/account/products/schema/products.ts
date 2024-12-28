import { relations } from 'drizzle-orm';
import { pgTable, serial, text, decimal } from 'drizzle-orm/pg-core';

import { categories } from '@/db/schema';
import { productVariants } from '@/db/schema/product-variants';

import { timestamps } from '../../../../db/constants/timestamps';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: decimal('price').notNull(),
  categoryId: serial('category_id').notNull(),
  ...timestamps,
});

export const productsRelations = relations(products, ({ one, many }) => ({
  productCategory: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
    relationName: 'product_category',
  }),
  productVariants: many(productVariants, {
    relationName: 'product_variants',
  }),
}));
