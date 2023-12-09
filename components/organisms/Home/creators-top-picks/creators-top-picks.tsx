import Image from 'next/image';

import { imageBucketUrl } from '@/constants/image-bucket-url';
import { Locale } from '@/i18n.config';
import { supabase } from '@/lib/init-supabase';
// import { CreatorsTopPicks as CreatorsTopPicksInterface } from '@/types/responses/CreatorsTopPicks';
import Camera from '@icons/camera';
import Plus from '@icons/plus';
import { getDictionary } from '@lib/get-dictionary';

import Badge from '../../../atoms/badge/badge';
import Button from '../../../atoms/button/button';
import ImageCard from '../../../atoms/image-card/image-card';
import SectionTitle from '../../../atoms/section-title/section-title';

interface Props {
  lang: Locale;
}

const CreatorsTopPicks = async ({ lang }: Props) => {
  const {
    home: { creatorTopPicks },
  } = await getDictionary(lang);

  const { data: creatorsTopPicksData } = await supabase.from('creators').select();

  return (
    <section className="horizontal-spacing flex justify-center flex-wrap mb-10">
      <SectionTitle title={creatorTopPicks.title} subtitle={creatorTopPicks.subtitle} titleClassName="text-center" subtitleClassName="self-center" />
      <div className="grid w-full h-[1200px] relative grid-cols-2 sm:grid-cols-3 lg:h-[800px] xl:h-[1000px] 2xl:h-[1200px] lg:grid-cols-4 grid-rows-[repeat(auto-fit,minmax(200px,1fr))]  gap-3 items-center justify-between mt-10">
        {creatorsTopPicksData?.map(({ id, creator_name, image }) => (
          <ImageCard key={id} className="relative h-full">
            <Image src={`${imageBucketUrl}/creators/${image}`} fill alt={creator_name} className="h-full w-full" />
            <Badge wrapperClassName="absolute top-4 left-4">
              <Camera className="w-4 h-4 fill-gray-600" />
              {creator_name}
            </Badge>
          </ImageCard>
        ))}
        <div className="absolute bottom-0 left-0 right-0  z-10 h-44  bg-gradient-to-t from-white" />
        <Button
          variant="contained"
          color="white"
          size="lg"
          startIcon={<Plus className="stroke-2" />}
          className="absolute bottom-14 z-20 left-2/4 -translate-x-2/4">
          {creatorTopPicks.moreProducts}
        </Button>
      </div>
    </section>
  );
};

export default CreatorsTopPicks;
