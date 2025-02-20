import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { dateFormats } from '@/constants/date-formats';

import { Category } from '../../categories/api/types/category';
import { Product } from '../api/types/product';
import { ProductVariantsWithImagesAndTags } from '../api/types/product-variant';
import ProductVariantTableCell from '../components/molecules/product-variant-table-cell';

export interface ProductsActionSlotPayload {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
}

export const getProductsTableColumns = (
  actionsSlot: (payload: ProductsActionSlotPayload) => ReactNode,
) => {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      meta: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Name" />;
      },
    },
    {
      accessorKey: 'price',
      meta: 'price',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Price" />;
      },
      cell: ({ getValue }) => {
        return <p>€{getValue() as string}</p>;
      },
    },
    {
      accessorKey: 'productVariants',
      header: 'Variants',
      enableHiding: false,
      cell: ({ row }) => {
        const variants = row.getValue(
          'productVariants',
        ) as ProductVariantsWithImagesAndTags[];

        return (
          <ProductVariantTableCell
            variants={variants}
            productId={row.original.id}
          />
        );
      },
    },
    {
      accessorKey: 'productCategory',
      meta: 'category',
      enableHiding: false,
      filterFn: (rows, columnId, filterValue) => {
        const category = rows.getValue(columnId) as Category;

        return filterValue.includes(category.id.toString());
      },
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Category" />;
      },
      cell: ({ getValue }) => {
        const category = getValue() as Category;

        return <p>{category.name}</p>;
      },
    },
    {
      accessorKey: 'createdAt',
      meta: 'Created at',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Created at" />;
      },
      cell: ({ getValue }) => {
        return (
          <FormatDate
            date={new Date((getValue() as string) ?? new Date())}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return actionsSlot({
          id: product.id,
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
          description: product.description,
        });
      },
    },
  ];

  return columns;
};
