export enum CategoryIcon {
  ARMCHAIR = 'armchairs',
  SOFA = 'sofas',
  BED = 'beds',
  ACCESSORIES = 'accessories',
  WARDROBE = 'wardrobe',
  OUTDOOR = 'outdoor',
  TV_SHELF = 'tv_shelf',
}

export interface Category {
  id: number;
  name: string;
  image: string;
  icon: CategoryIcon;
  createdBy: string | null;
  updated_at: Date | null;
  created_at: Date;
}
