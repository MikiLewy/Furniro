import { fetchCategories } from '@/features/account/api/lib/categories';

import AccountPageHeader from '../../molecules/account-page-header';
import CategoriesPageHeaderActions from '../../organisms/categories/categories-page-header-actions';

import ClientCategories from './categories.client';

const ServerCategories = async () => {
  const categories = await fetchCategories();

  console.log(categories);

  return (
    <div>
      <AccountPageHeader title="Categories">
        <CategoriesPageHeaderActions />
      </AccountPageHeader>
      <ClientCategories data={categories} />
    </div>
  );
};

export default ServerCategories;
