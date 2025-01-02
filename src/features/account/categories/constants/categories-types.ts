import {
  Armchair,
  Bed,
  Fence,
  LampCeiling,
  Refrigerator,
  Sofa,
  TvMinimal,
} from 'lucide-react';

import { CategoryType } from '../api/types/category';

export const categoriesTypes = {
  [CategoryType.ARMCHAIR]: {
    icon: Armchair,
    label: 'Armchairs',
    value: CategoryType.ARMCHAIR,
  },
  [CategoryType.SOFA]: {
    icon: Sofa,
    label: 'Sofas',
    value: CategoryType.SOFA,
  },
  [CategoryType.BED]: {
    icon: Bed,
    label: 'Beds',
    value: CategoryType.BED,
  },
  [CategoryType.ACCESSORIES]: {
    icon: LampCeiling,
    label: 'Accessories',
    value: CategoryType.ACCESSORIES,
  },
  [CategoryType.WARDROBE]: {
    icon: Refrigerator,
    label: 'Wardrobe',
    value: CategoryType.WARDROBE,
  },
  [CategoryType.TV_SHELF]: {
    icon: TvMinimal,
    label: 'TV stands',
    value: CategoryType.TV_SHELF,
  },
  [CategoryType.OUTDOOR]: {
    icon: Fence,
    label: 'Outdoor',
    value: CategoryType.OUTDOOR,
  },
};
