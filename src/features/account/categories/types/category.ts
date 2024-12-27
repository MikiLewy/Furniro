export enum CategoryIcon {
  ARMCHAIR = 'armchairs',
  SOFA = 'sofas',
  BED = 'beds',
  ACCESSORIES = 'accessories',
  WARDROBE = 'wardrobe',
  OUTDOOR = 'outdoor',
}

export interface Category {
  id: number;
  name: string;
  image: string | null;
  icon: string | null;
  createdBy: string | null;
  updated_at: Date | null;
  created_at: Date;
  deleted_at: Date | null;
}
