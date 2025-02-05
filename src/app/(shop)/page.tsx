import CategoriesList from '@/components/organisms/categories-list';
import AboutUs from '@features/home/components/organisms/about-us';
import Hero from '@features/home/components/organisms/hero';
import RecommendedProducts from '@features/home/components/organisms/recommended-products';

export default async function Home() {
  return (
    <div className="h-full">
      <Hero />
      <section className="flex flex-col gap-10 py-6 lg:py-10 lg:gap-14">
        <CategoriesList />
        <RecommendedProducts />
        <AboutUs />
      </section>
    </div>
  );
}
