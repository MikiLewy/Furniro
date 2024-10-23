'use client';

import ProductCard from '@components/atoms/product-card';
import { useProducts } from '@features/products/hooks/query/use-products';

const ClientProductsList = () => {
  const { data } = useProducts();

  return (
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-2 w-full">
      {data?.map(product => (
        <div key={product.id} className="col-span-1">
          <ProductCard
            title={product.title_en}
            imageSrc={product.image}
            price={product.price}
            transparentImageSrc={product.transparentImg}
          />
        </div>
      ))}
    </section>
  );
};

export default ClientProductsList;
