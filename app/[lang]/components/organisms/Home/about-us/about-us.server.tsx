import Image from 'next/image';

import { Locale } from '@/i18n.config';
import aboutUsImg from '@/public/assets/images/about-us.webp';
import Globe from '@icons/globe';
import { Heart } from '@icons/heart';
import LocationPin from '@icons/location-pin';
import Wardrobe from '@icons/wardrobe';
import { getDictionary } from '@lib/get-dictionary';

import IconAnnotation from '../../../atoms/icon-annotation/icon-annotation';
import SectionTitle from '../../../atoms/section-title/section-title';

import ClientAboutUs from './about-us.client';

interface Props {
  lang: Locale;
}

const ServerAboutUs = async ({ lang }: Props) => {
  const {
    home: { aboutUs },
  } = await getDictionary(lang);

  return (
    <section className="horizontal-spacing flex flex-col gap-5 lg:flex-row lg:justify-end lg:items-center lg:gap-10">
      <div className="flex flex-col lg:basis-3/4 xl:basis-1/2 ">
        <span className="text-primary text-xs uppercase font-semibold mb-1">{aboutUs.moreAbout}</span>
        <SectionTitle title={aboutUs.title} />
        <p className="text-base text-secondary max-w-[90%] leading-loose xl:mt-4">{aboutUs.description}</p>
        <div className="flex flex-col gap-3 my-5 xl:flex-row xl:flex-wrap xl:gap-6 xl:my-8">
          <IconAnnotation wrapperClassName="xl:basis-[45%]" icon={<Wardrobe />} annotation={aboutUs.stats.originalDesigns} />
          <IconAnnotation
            wrapperClassName="xl:basis-[45%]"
            icon={<Heart className="fill-transparent stroke-primary" />}
            annotation={aboutUs.stats.happyCustomers}
          />
          <IconAnnotation wrapperClassName="xl:basis-[45%]" icon={<Globe />} annotation={aboutUs.stats.materialSourced} />
          <IconAnnotation wrapperClassName="xl:basis-[45%]" icon={<LocationPin />} annotation={aboutUs.stats.producedLocally} />
        </div>
        <ClientAboutUs btnContentTranslation={aboutUs.moreAbout} />
      </div>
      <Image
        src={aboutUsImg}
        alt={aboutUs.aboutUsImgAlt}
        className="rounded-3xl max-h-[600px] object-cover lg:basis-1/4 xl:basis-1/2 lg:-order-1  "
      />
    </section>
  );
};

export default ServerAboutUs;
