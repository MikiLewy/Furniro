export interface Product {
  id: number;
  title_en: string;
  title_pl: string;
  price: number;
  image: string;
  transparentImg: string;
  created_at: Date;
  isBestseller: boolean;
  isRecommended: boolean;
}
