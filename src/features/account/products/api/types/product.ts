import { Category } from '@/features/account/categories/api/types/category';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  productCategory?: Category;
  product_variants?: [];
  updated_at: Date | null;
  created_at: Date;
}
