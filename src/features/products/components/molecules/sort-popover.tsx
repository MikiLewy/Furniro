'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useMediaQuery from '@/hooks/use-media-query';
import { SetSortController } from '@/hooks/use-sort-controller';
import { SortOrder } from '@/types/enum/sort-order';

import SortOptions from '../atoms/sort-options';

export type SortOption = {
  key: string;
  fieldName: string;
  value: SortOrder;
  label: string;
};

const sortOptions: SortOption[] = [
  {
    key: 'name-asc',
    fieldName: 'name',
    value: SortOrder.ASC,
    label: 'Alphabetically, A-Z',
  },
  {
    key: 'name-desc',
    fieldName: 'name',
    value: SortOrder.DESC,
    label: 'Alphabetically, Z-A',
  },
  {
    key: 'price-asc',
    fieldName: 'price',
    value: SortOrder.ASC,
    label: 'Price, low to high',
  },
  {
    key: 'price-desc',
    fieldName: 'price',
    value: SortOrder.DESC,
    label: 'Price, high to low',
  },
  {
    key: 'created_at-asc',
    fieldName: 'created_at',
    value: SortOrder.ASC,
    label: 'Oldest',
  },
  {
    key: 'created_at-desc',
    fieldName: 'created_at',
    value: SortOrder.DESC,
    label: 'Newest',
  },
];

interface Props {
  setSortController: SetSortController;
}

const SortPopover = ({ setSortController }: Props) => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [selectedSortOption, setSelectedSortOption] = useState<string>(
    sortOptions[0].key,
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter />
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 hidden md:block" align="end">
          <SortOptions
            options={sortOptions}
            setOpen={setOpen}
            setSortController={setSortController}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter />
          Sort
        </Button>
      </DrawerTrigger>
      <DrawerTitle className="sr-only">Sort options</DrawerTitle>
      <DrawerContent className="block md:hidden">
        <div className="mt-4 border-t">
          <SortOptions
            options={sortOptions}
            setOpen={setOpen}
            setSortController={setSortController}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SortPopover;
