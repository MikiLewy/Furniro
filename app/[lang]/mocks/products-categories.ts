import bedroom from '@/public/assets/images/bedroom.webp';
import dining from '@/public/assets/images/dining-room.webp';
import livingRoom from '@/public/assets/images/living-room.webp';

import { ProductCategory } from '../types/responses/ProductCategory';

export const PRODUCTS_CATEGORIES: ProductCategory[] = [
  {
    id: 1,
    category: 'dining',
    img: {
      src: dining,
      alt: 'Dining room',
    },
  },
  {
    id: 2,
    category: 'living',
    img: {
      src: livingRoom,
      alt: 'Living room',
    },
  },
  {
    id: 3,
    category: 'bedroom',
    img: {
      src: bedroom,
      alt: 'Bedroom',
    },
  },
];
