import {
  Armchair,
  Bed,
  Fence,
  LampCeiling,
  Refrigerator,
  Sofa,
  TvMinimal,
} from 'lucide-react';

import { CategoryIcon } from '../api/types/category';

export const categoryIcons = {
  [CategoryIcon.ARMCHAIR]: {
    icon: Armchair,
    label: 'Armchairs',
    value: CategoryIcon.ARMCHAIR,
  },
  [CategoryIcon.SOFA]: {
    icon: Sofa,
    label: 'Sofas',
    value: CategoryIcon.SOFA,
  },
  [CategoryIcon.BED]: {
    icon: Bed,
    label: 'Beds',
    value: CategoryIcon.BED,
  },
  [CategoryIcon.ACCESSORIES]: {
    icon: LampCeiling,
    label: 'Accessories',
    value: CategoryIcon.ACCESSORIES,
  },
  [CategoryIcon.WARDROBE]: {
    icon: Refrigerator,
    label: 'Wardrobe',
    value: CategoryIcon.WARDROBE,
  },
  [CategoryIcon.TV_SHELF]: {
    icon: TvMinimal,
    label: 'TV stands',
    value: CategoryIcon.TV_SHELF,
  },
  [CategoryIcon.OUTDOOR]: {
    icon: Fence,
    label: 'Outdoor',
    value: CategoryIcon.OUTDOOR,
  },
};
