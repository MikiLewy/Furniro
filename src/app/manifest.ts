import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Furniro',
    short_name: 'Furniro',
    description:
      'Discover Timeless Elegance and Functional Design at Our Furniture Shop. Explore a Wide Range of High-Quality Furniture Pieces for Your Home. Shop Now for the Perfect Blend of Style and Comfort.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
