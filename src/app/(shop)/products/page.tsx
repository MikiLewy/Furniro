import Header from '@features/products/components/organisms/header';
import ProductsList from '@features/products/components/organisms/products-list';

export default async function Products() {
  return (
    <main className="flex flex-col horizontal-spacing gap-10 py-4 lg:py-10 lg:gap-20">
      <Header />
      <ProductsList />
    </main>
  );
}
