import { pgTable, serial, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';

import { CategoryType } from '../api/types/category';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  image: text('image').notNull(),
  mainImage: text('main_image'),
  subtitle: text('subtitle'),
  description: text('description'),
  type: text('type').$type<CategoryType>().notNull(),
  createdBy: text('created_by'),
  ...timestamps,
});
