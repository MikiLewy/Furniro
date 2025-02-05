import { relations } from 'drizzle-orm';
import { pgTable, serial, text, real, index } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { products, users } from '@/db/schema';

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    rating: real('rating').notNull(),
    productId: serial('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    ...timestamps,
  },
  table => {
    return {
      productIdx: index('productIdx').on(table.productId),
      userIdx: index('userIdx').on(table.userId),
    };
  },
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
    relationName: 'user_reviews',
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
    relationName: 'product_reviews',
  }),
}));
