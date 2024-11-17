import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { products } from './products';
import { timestamps } from '../constants/timestamps';

export const imageTypeEnum = pgEnum('type', ['main', 'transparent', 'default']);

export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),
  productId: serial('product_id')
    .notNull()
    .references(() => products.id),
  url: text('url').notNull(),
  type: imageTypeEnum('type'),
  ...timestamps,
});
