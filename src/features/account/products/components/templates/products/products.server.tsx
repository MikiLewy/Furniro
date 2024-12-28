import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';

import { getProducts } from '../../../api/lib/products';
import ProductsPageHeaderActions from '../../organisms/products-page-header-actions';

import ClientProducts from './products.client';

const ServerProducts = async () => {
  const products = await getProducts();

  return (
    <>
      <AccountPageHeader title="Products">
        <ProductsPageHeaderActions />
      </AccountPageHeader>
      <ClientProducts data={products} />
    </>
  );
};

export default ServerProducts;
