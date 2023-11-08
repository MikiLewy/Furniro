import { StaticImageData } from 'next/image';

export type ProductCategories = 'dining' | 'living' | 'bedroom';

export interface ProductCategory {
  id: number;
  category: ProductCategories;
  img: {
    src: StaticImageData;
    alt: string;
  };
}
