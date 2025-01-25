import { relations } from 'drizzle-orm';
import { integer, pgTable, real, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { products, productVariants, users } from '@/db/schema';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  total: real('total').notNull(),
  status: text('status').notNull(),
  receiptURL: text('receiptURL'),
  paymentIntentID: text('paymentIntentID'),
  ...timestamps,
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
    relationName: 'user_orders',
  }),
  orderProduct: many(orderProduct, { relationName: 'orderProduct' }),
}));

export const orderProduct = pgTable('orderProduct', {
  id: serial('id').primaryKey(),
  quantity: integer('quantity').notNull(),
  productVariantID: serial('productVariantID')
    .notNull()
    .references(() => productVariants.id, { onDelete: 'cascade' }),
  productID: serial('productID')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  orderID: serial('orderID')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
  order: one(orders, {
    fields: [orderProduct.orderID],
    references: [orders.id],
    relationName: 'orderProduct',
  }),
  product: one(products, {
    fields: [orderProduct.productID],
    references: [products.id],
    relationName: 'products',
  }),
  productVariants: one(productVariants, {
    fields: [orderProduct.productVariantID],
    references: [productVariants.id],
    relationName: 'productVariants',
  }),
}));
