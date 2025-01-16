import { relations } from 'drizzle-orm';
import { pgTable, serial, text, real } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { products, users } from '@/db/schema';

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  rating: real('rating').notNull(),
  productId: serial('productId').notNull(),
  userId: text('userId').notNull(),
  ...timestamps,
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
    relationName: 'user',
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
    relationName: 'product',
  }),
}));
