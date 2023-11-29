import { ImagePayload } from '../interfaces/Image';

export type ProductCategories = 'dining' | 'living' | 'bedroom';

export interface ProductCategory {
  id: number;
  category: ProductCategories;
  img: ImagePayload;
}
