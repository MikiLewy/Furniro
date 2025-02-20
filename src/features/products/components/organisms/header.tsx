import Image from 'next/image';

import { getImageBlurDataUrl } from '@/utils/get-image-blur-data-url';
import SectionTitle from '@components/atoms/section-title';

interface Props {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  blurDataUrl?: string;
}

const Header = async ({
  title,
  description,
  image,
  subtitle,
  blurDataUrl,
}: Props) => {
  return (
    <header className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      <Image
        src={image}
        alt={title}
        width={1000}
        height={600}
        placeholder="blur"
        blurDataURL={blurDataUrl || (await getImageBlurDataUrl(image))}
        className="rounded-3xl max-h-[300px] object-cover object-bottom lg:object-center lg:max-h-[400px] 2xl:max-h-[550px] 2xl:basis-2/4"
      />
      <div className="flex flex-col justify-center gap-2 basis-3/4 2xl:basis-2/4">
        <SectionTitle title={title} subtitle={subtitle} />
        <div
          className="text-sm lg:text-base leading-6 flex flex-col gap-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </header>
  );
};

export default Header;
