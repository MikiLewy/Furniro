'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Table } from '@/components/organisms/table/table';
import { TableFacetedFilter } from '@/components/organisms/table/table-faceted-filters';
import { TablePagination } from '@/components/organisms/table/table-pagination';
import { Button } from '@/components/ui/button';

import { OrderStatus } from '../../api/types/order-status';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function OrdersTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  const orderStatuses: { value: OrderStatus; label: string }[] = [
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'succeeded',
      label: 'Succeeded',
    },
  ];

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        {table.getColumn('status') ? (
          <TableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={orderStatuses}
          />
        ) : null}
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="text-sm px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <Table columnsLength={columns.length} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
