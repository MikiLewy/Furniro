import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getCategories } from '@/features/account/categories/api/lib/categories';
import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';

import CategoriesPageHeaderActions from '../../organisms/categories-page-header-actions';

import ClientCategories from './categories.client';

const ServerCategories = async () => {
  const session = await auth();

  const categories = await getCategories();

  if (session?.user?.role === 'customer') {
    redirect('/orders');
  }

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
