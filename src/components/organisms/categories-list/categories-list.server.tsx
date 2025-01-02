import SectionTitle from '@/components/atoms/section-title';
import { getCategories } from '@/features/account/categories/api/lib/categories';

import ClientCategoriesList from './categories-list.client';

const ServerCategoriesList = async () => {
  const categories = await getCategories();

  return (
    <div>
      <SectionTitle title="Our customers' top picks" />
      <div className="mt-4">
        <ClientCategoriesList categories={categories} />
      </div>
    </div>
  );
};

export default ServerCategoriesList;
