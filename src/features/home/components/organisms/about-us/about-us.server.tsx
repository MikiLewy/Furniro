import Image from 'next/image';

import aboutUsImg from '@assets/images/about-us.webp';
import IconAnnotation from '@components/atoms/icon-annotation';
import SectionTitle from '@components/atoms/section-title';

import Globe from '../../../../../icons/globe';
import { Heart } from '../../../../../icons/heart';
import LocationPin from '../../../../../icons/location-pin';
import Wardrobe from '../../../../../icons/wardrobe';

import ClientAboutUs from './about-us.client';

const ServerAboutUs = async () => {
  return (
    <section className="horizontal-spacing flex flex-col gap-5 lg:flex-row lg:justify-end lg:items-center lg:gap-10">
      <div className="flex flex-col lg:basis-3/4 xl:basis-1/2 ">
        <SectionTitle
          title="Hi, we're Furniro!"
          subtitle="More about Furniro"
          subtitleClassName="text-primary"
        />
        <p className="text-base text-secondary max-w-[90%] leading-loose mt-2 xl:mt-4">
          Furniro is a new-generation design brand offering a versatile range of
          top-notch sideboards, poufs, beds, and tables, already delivered to
          over 10,000 customers across 10 countries. The home of bold ideas and
          timeless designs, leaving plenty of room for your personality. Already
          feeling at home?
        </p>
        <div className="flex flex-col gap-3 my-5 xl:flex-row xl:flex-wrap xl:gap-6 xl:my-8">
          <IconAnnotation
            wrapperClassName="xl:basis-[45%]"
            icon={<Wardrobe />}
            annotation="150+ original furniro designs"
          />
          <IconAnnotation
            wrapperClassName="xl:basis-[45%]"
            icon={<Heart className="fill-transparent stroke-primary " />}
            annotation="10 000+ happy customers"
          />
          <IconAnnotation
            wrapperClassName="xl:basis-[45%]"
            icon={<Globe />}
            annotation="Materials sourced only from the EU"
          />
          <IconAnnotation
            wrapperClassName="xl:basis-[45%]"
            icon={<LocationPin />}
            annotation="Produced locally in Poland"
          />
        </div>
        <ClientAboutUs btnContentTranslation="More about Furniro" />
      </div>
      <Image
        src={aboutUsImg}
        alt="Yellow sofa in salon"
        className="rounded-3xl max-h-[600px] object-cover lg:basis-1/4 xl:basis-1/2 lg:-order-1"
      />
    </section>
  );
};

export default ServerAboutUs;
