import { getProductsWithVariantsImages } from '@/features/account/products/api/lib/products';
import SectionTitle from '@components/atoms/section-title';

import ClientRecommendedProducts from './recommended-products.client';

const ServerRecommendedProducts = async () => {
  const products = await getProductsWithVariantsImages();

  return (
    <section>
      <SectionTitle title="Recommended products" />
      <div className="mt-5">
        <ClientRecommendedProducts products={products} />
      </div>
    </section>
  );
};

export default ServerRecommendedProducts;
