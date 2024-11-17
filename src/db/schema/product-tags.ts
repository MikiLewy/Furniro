import { pgTable, serial } from 'drizzle-orm/pg-core';
import { tags } from './tags';
import { products } from './products';

export const productTags = pgTable('product_tags', {
  id: serial('id').primaryKey(),
  productId: serial('product_id')
    .notNull()
    .references(() => products.id),
  tagId: serial('tag_id')
    .notNull()
    .references(() => tags.id),
});
