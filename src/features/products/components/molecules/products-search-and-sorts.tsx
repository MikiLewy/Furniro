'use client';

import { SetSortController } from '@/hooks/use-sort-controller';

import Query from '../atoms/query';

import SortPopover from './sort-popover';

interface Props {
  query: string;
  handleChangeQuery: (value: string) => void;
  setSortController: SetSortController;
}

const ProductsSearchAndSorts = ({
  query,
  handleChangeQuery,
  setSortController,
}: Props) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <Query value={query} onChange={handleChangeQuery} />
      <SortPopover setSortController={setSortController} />
    </div>
  );
};

export default ProductsSearchAndSorts;
