import { Metadata } from 'next';

import Products from '@/features/account/products/components/templates/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your products and variants.',
};

const ProductsPage = async () => {
  return <Products />;
};

export default ProductsPage;
