import AccountPageHeader from '../../molecules/account-page-header';
import CategoriesPageHeaderActions from '../../organisms/categories/categories-page-header-actions';

import ClientCategories from './categories.client';

const ServerCategories = () => {
  return (
    <div>
      <AccountPageHeader title="Categories">
        <CategoriesPageHeaderActions />
      </AccountPageHeader>
      <ClientCategories />
    </div>
  );
};

export default ServerCategories;
