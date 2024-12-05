import AboutUs from '@features/home/components/organisms/about-us';
import CreatorsTopPicks from '@features/home/components/organisms/creators-top-picks/creators-top-picks';
import Hero from '@features/home/components/organisms/hero';
import RecommendedProducts from '@features/home/components/organisms/recommended-products';

export default async function Home() {
  return (
    <div>
      <Hero />
      <main className="flex flex-col gap-10 py-10 lg:py-20 lg:gap-20">
        <RecommendedProducts />
        <AboutUs />
        <CreatorsTopPicks />
      </main>
    </div>
  );
}
