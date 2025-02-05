import { Dispatch, SetStateAction } from 'react';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { SetSortController } from '@/hooks/use-sort-controller';
import { cn } from '@/lib/utils';

import { SortOption } from '../molecules/sort-popover';

interface Props {
  options: SortOption[];
  setOpen: (open: boolean) => void;
  setSortController: SetSortController;
  selectedSortOption: string;
  setSelectedSortOption: Dispatch<SetStateAction<string>>;
}

const SortOptions = ({
  options,
  selectedSortOption,
  setOpen,
  setSelectedSortOption,
  setSortController,
}: Props) => {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {options.map(option => (
            <CommandItem
              key={option.key}
              className={cn(
                selectedSortOption === option.key
                  ? 'text-primary'
                  : 'text-secondary-darker',
              )}
              value={option.key}
              onSelect={value => {
                setSortController({
                  sortOrder: option.value,
                  sortBy: option.fieldName,
                });
                setSelectedSortOption(value);
                setOpen(false);
              }}>
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SortOptions;
