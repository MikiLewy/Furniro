export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  product_variants?: [];
  updated_at: Date | null;
  created_at: Date;
}
