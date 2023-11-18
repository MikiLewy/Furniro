import transparentFlomArmchair from '@/public/assets/images/products/flom-armchair/flom-armchair-transparent.webp';
import flomArmchair from '@/public/assets/images/products/flom-armchair/flom-armchair.webp';
import transparentFlomSofa from '@/public/assets/images/products/flom-sofa/flom-sofa-transparent.webp';
import flomSofa from '@/public/assets/images/products/flom-sofa/flom-sofa.webp';
import transparentFolkPouf from '@/public/assets/images/products/folk-pouf/folk-pouf-transparent.webp';
import folkPouf from '@/public/assets/images/products/folk-pouf/folk-pouf.webp';
import transparentNookStool from '@/public/assets/images/products/nook-stool/nook-stool-transparent.webp';
import nookStool from '@/public/assets/images/products/nook-stool/nook-stool.webp';
import transparentRtvTable from '@/public/assets/images/products/rtv-table/rtv-table-transparent.webp';
import rtvTable from '@/public/assets/images/products/rtv-table/rtv-table.webp';
import transparentTableAnde from '@/public/assets/images/products/table-ande/table-ande-transparent.webp';
import tableAnde from '@/public/assets/images/products/table-ande/table-ande.webp';

import { RecommendedProduct } from '../types/responses/RecommendedProduct';

export const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: 1,
    title: 'Table Ande',
    price: 771,
    images: {
      contextual: {
        src: tableAnde,
        alt: 'table',
      },
      whiteBg: {
        src: transparentTableAnde,
        alt: 'table on white background',
      },
    },
  },
  {
    id: 2,
    title: 'Syltherine Table',
    price: 3751,
    images: {
      contextual: {
        src: rtvTable,
        alt: 'rtv table',
      },
      whiteBg: {
        src: transparentRtvTable,
        alt: 'rtv table on white background',
      },
    },
  },
  {
    id: 3,
    title: 'Nokk Stool',
    price: 1343,
    images: {
      contextual: {
        src: nookStool,
        alt: 'stool',
      },
      whiteBg: {
        src: transparentNookStool,
        alt: 'stool on white background',
      },
    },
  },
  {
    id: 4,
    title: 'Folk Pouf',
    price: 775,
    images: {
      contextual: {
        src: folkPouf,
        alt: 'pouf folk',
      },
      whiteBg: {
        src: transparentFolkPouf,
        alt: 'pouf folk on white background',
      },
    },
  },
  {
    id: 5,
    title: 'Flom sofa',
    price: 11496,
    images: {
      contextual: {
        src: flomSofa,
        alt: 'flom sofa',
      },
      whiteBg: {
        src: transparentFlomSofa,
        alt: 'flom sofa on white background',
      },
    },
  },
  {
    id: 6,
    title: 'Flom Armchair',
    price: 4596,
    images: {
      contextual: {
        src: flomArmchair,
        alt: 'flom armchair',
      },
      whiteBg: {
        src: transparentFlomArmchair,
        alt: 'flom armchair on white background',
      },
    },
  },
];
