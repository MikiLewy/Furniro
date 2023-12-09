export interface RecommendedProduct {
  id: number;
  title: string;
  price: number;
  images: {
    contextual: {
      src: string;
      alt: string;
    };
    whiteBg: {
      src: string;
      alt: string;
    };
  };
}
