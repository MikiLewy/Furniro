'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useMemo, useRef } from 'react';

import SkeletonsLoader from '@/components/atoms/skeletons-loader';
import { useProducts } from '@/features/products/hooks/use-products';
import { useSortController } from '@/hooks/use-sort-controller';
import { SortOrder } from '@/types/enum/sort-order';

import ProductsSearchAndFilters from '../../molecules/products-search-and-sorts';
import ProductsList from '../../organisms/products-list';

interface Props {
  categoryId?: number;
}

const ClientProducts = ({ categoryId }: Props) => {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });

  const [sortController, setSortController] = useSortController({
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
  });

  const observer = useRef<IntersectionObserver>();

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useProducts({
      categoryId,
      sortBy: sortController.sortBy,
      sortOrder: sortController.sortOrder,
      search: query,
      limit: 3,
    });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const products = useMemo(() => {
    return data?.pages?.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <>
      <ProductsSearchAndFilters
        query={query}
        handleChangeQuery={handleChangeQuery}
        setSortController={setSortController}
      />
      <ProductsList
        products={products || []}
        isLoading={isLoading}
        lastElementRef={lastElementRef}
      />
      {isFetching ? <SkeletonsLoader /> : null}
    </>
  );
};

export default ClientProducts;
