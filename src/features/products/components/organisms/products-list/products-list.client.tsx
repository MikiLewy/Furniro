'use client';
import ProductCard from '@/src/components/atoms/product-card/product-card';
import { useProducts } from '@/src/hooks/api/products/useProducts';
import { Locale } from '../../../src/i18n.config';
import { Language } from '@/src/types/enum/Language';

interface Props {
  locale: Locale;
}

const ClientProductsList = ({ locale }: Props) => {
  const { data } = useProducts();

  return (
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-2 w-full">
      {data?.map(product => (
        <div key={product.id} className="col-span-1">
          <ProductCard
            title={locale === Language.EN ? product.title_en : product.title_pl}
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
