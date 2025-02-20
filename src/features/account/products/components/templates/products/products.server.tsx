import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getCategories } from '@/features/account/categories/api/lib/categories';
import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';

import { getProductsWithVariantsAndCategory } from '../../../api/lib/products';
import ProductsPageHeaderActions from '../../organisms/products-page-header-actions';

import ClientProducts from './products.client';

const ServerProducts = async () => {
  const session = await auth();

  const products = await getProductsWithVariantsAndCategory({});

  const categories = await getCategories();

  if (session?.user?.role === 'customer') {
    redirect('/orders');
  }

  return (
    <>
      <AccountPageHeader title="Products">
        <ProductsPageHeaderActions categories={categories} />
      </AccountPageHeader>
      <ClientProducts data={products} categories={categories} />
    </>
  );
};

export default ServerProducts;
