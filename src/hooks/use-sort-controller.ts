import {
  SetValues,
  useQueryStates,
  Values,
  parseAsStringEnum,
  parseAsString,
} from 'nuqs';

import { SortOrder } from '@/types/enum/sort-order';

interface Params {
  sortOrder: SortOrder;
  sortBy: string;
}

export type SortController = Values<{
  sortOrder: { defaultValue: SortOrder; parse: (value: string) => SortOrder };
  sortBy: { defaultValue: string; parse: (value: string) => string };
}>;

export type SetSortController = SetValues<{
  sortOrder: { defaultValue: SortOrder; parse: (value: string) => SortOrder };
  sortBy: { defaultValue: string; parse: (value: string) => string };
}>;

type ReturnType = [SortController, SetSortController];

export const useSortController = ({
  sortOrder,
  sortBy,
}: Params): ReturnType => {
  const [sortController, setSortController] = useQueryStates(
    {
      sortOrder: parseAsStringEnum<SortOrder>(
        Object.values(SortOrder),
      ).withDefault(sortOrder),
      sortBy: parseAsString.withDefault(sortBy),
    },
    {
      history: 'push',
      shallow: false,
      clearOnDefault: false,
    },
  );

  return [sortController, setSortController];
};
