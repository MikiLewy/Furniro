import { SearchParams } from 'nuqs';

import CategoriesList from '@/components/organisms/categories-list';
import { getCategories } from '@/features/account/categories/api/lib/categories';
import { productsSearchParamsCache } from '@/features/account/products/lib/search-params-cache';
import { Products } from '@/features/products/components/templates/products';
import productsHeaderImg from '@assets/images/products-page.webp';
import Header from '@features/products/components/organisms/header';

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const ProductsPage = async ({ params, searchParams }: Props) => {
  const categorySlug = (await params).category;

  const parsedSearchParams = productsSearchParamsCache.parse(
    await searchParams,
  );

  const categories = await getCategories();

  const category = categories?.find(category => category.type === categorySlug);

  return (
    <section className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-20">
      <Header
        title={category ? category?.name : 'Products'}
        subtitle={
          category?.subtitle
            ? category.subtitle
            : 'Versatile, minimal, and feel-good'
        }
        description={
          category?.description
            ? category.description
            : `Step inside and explore our wide selection of versatile, timeless
          furniture pieces that seamlessly integrate into any space, offering
          blissful joy. Discover noo.ma’s feel-good comfort and make yourself at
          home.`
        }
        image={category?.mainImage ? category.mainImage : productsHeaderImg}
      />
      <CategoriesList />
      <Products
        categoryId={category?.id}
        parsedSearchParams={parsedSearchParams}
      />
    </section>
  );
};

export default ProductsPage;
