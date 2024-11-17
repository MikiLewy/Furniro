import {
  pgTable,
  serial,
  text,
  decimal,
  json,
  numeric,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../constants/timestamps';
import { categories } from './categories';
import { productVariants } from './product-variants';
import { tags } from './tags';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: json('description'),
  price: decimal('price').notNull(),
  discountPrice: decimal('discount_price'),
  height: numeric('height', { precision: 5, scale: 2 }),
  width: numeric('width', { precision: 5, scale: 2 }),
  depth: numeric('depth', { precision: 5, scale: 2 }),
  weight: numeric('weight', { precision: 5, scale: 2 }),
  materials: json('materials'),
  variantId: serial('variant_id')
    .notNull()
    .references(() => productVariants.id),
  categoryId: serial('category_id')
    .notNull()
    .references(() => categories.id),
  tagId: serial('tagId')
    .notNull()
    .references(() => tags.id),
  ...timestamps,
});
