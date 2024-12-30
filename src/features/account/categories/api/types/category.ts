import { InferResultType } from '@/types/infer-db-result-type';

export enum CategoryIcon {
  ARMCHAIR = 'armchairs',
  SOFA = 'sofas',
  BED = 'beds',
  ACCESSORIES = 'accessories',
  WARDROBE = 'wardrobe',
  OUTDOOR = 'outdoor',
  TV_SHELF = 'tv_shelf',
}

export type Category = InferResultType<'categories'>;
