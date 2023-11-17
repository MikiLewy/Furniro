import Image from 'next/image';

import Camera from '@/app/[lang]/icons/camera';
import { getDictionary } from '@/app/[lang]/lib/get-dictionary';
import { CREATORS_TOP_PICKS } from '@/app/[lang]/mocks/creators-top-picks';
import { Locale } from '@/i18n.config';

import Badge from '../../../atoms/badge/badge';
import ImageCard from '../../../atoms/image-card/image-card';
import SectionTitle from '../../../atoms/section-title/section-title';

interface Props {
  lang: Locale;
}

const ServerCreatorsTopPicks = async ({ lang }: Props) => {
  const {
    home: { creatorTopPicks },
  } = await getDictionary(lang);

  return (
    <section className="horizontal-spacing flex justify-center flex-wrap">
      <SectionTitle title={creatorTopPicks.title} subtitle={creatorTopPicks.subtitle} subtitleClassName="self-center" />
      <div className="grid relative grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-center gap-y-5 justify-between mt-10">
        {CREATORS_TOP_PICKS.map(({ id, creator, img }) => (
          <ImageCard key={id} className="relative">
            <Image src={img.src} alt={img.alt} className="h-full w-full" />
            <Badge wrapperClassName="absolute top-4 left-4">
              <Camera className="w-4 h-4 fill-gray-600" />
              {creator}
            </Badge>
          </ImageCard>
        ))}
        <div className="absolute bottom-0 left-0 right-0  z-10 h-44  bg-gradient-to-t from-white " />
      </div>
    </section>
  );
};

export default ServerCreatorsTopPicks;
