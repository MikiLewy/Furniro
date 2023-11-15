import { ImagePayload } from '../interfaces/Image';

export interface RecommendedProduct {
  id: number;
  title: string;
  price: number;
  images: {
    contextual: ImagePayload;
    whiteBg: ImagePayload;
  };
}
