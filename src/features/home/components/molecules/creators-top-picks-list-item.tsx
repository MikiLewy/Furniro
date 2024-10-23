'use client';
import Image from 'next/image';

import Badge from '@components/atoms/badge';
import ImageCard from '@components/atoms/image-card';
import { imageBucketUrl } from '@constants/image-bucket-url';
import { useCreatorsTopPicks } from '@features/home/hooks/query/use-creators-top-picks';

import Camera from '../../../../icons/camera';

const CreatorsTopPicksListItem = () => {
  const { data } = useCreatorsTopPicks();

  return (
    <>
      {data?.map(({ id, creator_name, image }) => (
        <ImageCard key={id} className="relative h-full">
          <Image
            src={`${imageBucketUrl}/creators/${image}`}
            fill
            alt={creator_name}
            className="h-full w-full"
          />
          <Badge wrapperClassName="absolute top-4 left-4">
            <Camera className="w-4 h-4 fill-gray-600" />
            {creator_name}
          </Badge>
        </ImageCard>
      ))}
    </>
  );
};

export default CreatorsTopPicksListItem;
