import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { productVariants, users } from '@/db/schema';

export const wishlist = pgTable('wishlist', {
  id: serial('id').primaryKey(),
  productVariantId: serial('productVariantId')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps,
});

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, {
    fields: [wishlist.userId],
    references: [users.id],
    relationName: 'user',
  }),
  productVariant: one(productVariants, {
    fields: [wishlist.productVariantId],
    references: [productVariants.id],
    relationName: 'product_variant',
  }),
}));
