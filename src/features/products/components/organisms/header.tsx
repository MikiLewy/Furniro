import Image from 'next/image';

import productsHeaderImg from '@assets/images/products-page.webp';
import SectionTitle from '@components/atoms/section-title';

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <Image
        src={productsHeaderImg}
        alt="Room interior"
        className="rounded-3xl max-h-[300px] object-cover object-bottom lg:object-center lg:max-h-[400px] 2xl:max-h-[600px] 2xl:basis-2/4"
      />
      <div className="flex flex-col justify-center gap-4 basis-3/4 2xl:basis-2/4">
        <SectionTitle title="Products" />
        <p className="text-sm lg:text-base leading-7">
          Explore Our Exquisite Collection of Furniture: Elevate your space with
          our handpicked selection of quality furniture pieces. Discover
          timeless designs crafted for comfort, functionality, and style. From
          modern accents to classic essentials, find the perfect match for your
          home.
        </p>
      </div>
    </header>
  );
};

export default Header;
