import { MetadataRoute } from 'next';

import { getCategories } from '@/features/account/categories/api/lib/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();

  const categoriesEntries: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/collections/${category.type}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/oferta`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/collections/all`,
    },
    ...categoriesEntries,
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/orders`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/wishlist`,
      lastModified: new Date('2024-05-18'),
    },
    {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/settings`,
      lastModified: new Date('2024-05-24'),
    },
  ];
}
