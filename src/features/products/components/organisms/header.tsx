import Image from 'next/image';

import productsHeaderImg from '@assets/images/products-page.webp';
import SectionTitle from '@components/atoms/section-title';

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <Image
        src={productsHeaderImg}
        alt="Room interior"
        className="rounded-3xl max-h-[300px] object-cover object-bottom lg:object-center lg:max-h-[400px] 2xl:max-h-[550px] 2xl:basis-2/4"
      />
      <div className="flex flex-col justify-center gap-2 basis-3/4 2xl:basis-2/4">
        <SectionTitle
          title="Products"
          subtitle="Versatile, minimal, and feel-good"
        />
        <p className="text-sm lg:text-base leading-6">
          Step inside and explore our wide selection of versatile, timeless
          furniture pieces that seamlessly integrate into any space, offering
          blissful joy. Discover noo.ma’s feel-good comfort and make yourself at
          home.
        </p>
      </div>
    </header>
  );
};

export default Header;
