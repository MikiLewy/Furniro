import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { formatPrice } from '@/utils/format-price';

import ProductTitle from '../atoms/product-title';

import ProductRating from './product-rating';

interface Props {
  productId: number;
  title: string;
  price: number;
  categoryName: string;
  categoryType: string;
}

const ProductHeader = ({
  productId,
  price,
  title,
  categoryName,
  categoryType,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/collections/all">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/collections/${categoryType}`}>
              {categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <ProductTitle name={title} />
          <ProductRating productId={productId} />
        </div>
        <p className="text-secondary-darker">
          {formatPrice({ amount: price })}
        </p>
      </div>
    </div>
  );
};

export default ProductHeader;
