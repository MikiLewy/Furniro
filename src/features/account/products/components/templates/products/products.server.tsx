import { getCategories } from '@/features/account/categories/api/lib/categories';
import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';

import { getProducts } from '../../../api/lib/products';
import ProductsPageHeaderActions from '../../organisms/products-page-header-actions';

import ClientProducts from './products.client';

const ServerProducts = async () => {
  const products = await getProducts();

  const categories = await getCategories();

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
