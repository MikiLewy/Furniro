'use client';

import Image from 'next/image';

import VariantCircle from '@/components/atoms/variant-circle';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/utils/format-price';

interface Props {
  productName: string;
  imageUrl: string;
  productVariantName: string;
  productVariantColor: string;
  quantity: number;
  price: number;
}

const ViewOrderDetailsTableRow = ({
  imageUrl,
  productName,
  productVariantName,
  productVariantColor,
  price,
  quantity,
}: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Image src={imageUrl} alt={productName} width={50} height={50} />
      </TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>
        <VariantCircle name={productVariantName} color={productVariantColor} />
      </TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{formatPrice({ amount: price })}</TableCell>
      <TableCell>
        {formatPrice({
          amount: price * quantity,
        })}
      </TableCell>
    </TableRow>
  );
};

export default ViewOrderDetailsTableRow;
