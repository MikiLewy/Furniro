import CategoriesList from '@/components/organisms/categories-list';
import { getCategories } from '@/features/account/categories/api/lib/categories';
import productsHeaderImg from '@assets/images/products-page.webp';
import Header from '@features/products/components/organisms/header';
import ProductsList from '@features/products/components/organisms/products-list';

interface Props {
  params: Promise<{ category: string }>;
}

const ProductsPage = async ({ params }: Props) => {
  const categorySlug = (await params).category;

  const categories = await getCategories();

  const category = categories?.find(category => category.type === categorySlug);

  return (
    <main className="flex flex-col gap-10 py-4 lg:py-10 lg:gap-20">
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
      {categorySlug === 'all' || !category ? <CategoriesList /> : null}
      <ProductsList categoryId={category?.id} />
    </main>
  );
};

export default ProductsPage;
