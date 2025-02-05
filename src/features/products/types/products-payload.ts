import { SortOrder } from '@/types/enum/sort-order';

export interface ProductsPayload {
  limit?: number;
  categoryId?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  offset?: number;
}
