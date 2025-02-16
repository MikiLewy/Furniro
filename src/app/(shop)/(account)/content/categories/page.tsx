import { Metadata } from 'next';

import Categories from '@/features/account/categories/components/templates/categories';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage your products categories.',
};

const CategoriesPage = async () => {
  return <Categories />;
};

export default CategoriesPage;
