import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  src: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const Thumbnail = ({ isSelected, name, onClick, src }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={name}
        onClick={onClick}
        width={90}
        height={90}
        onLoadingComplete={() => {
          setIsImageLoaded(true);
        }}
        className={cn(
          isImageLoaded ? 'opacity-55' : 'opacity-0',
          isSelected ? 'opacity-100' : 'opacity-55',
          'object-cover h-[65px] w-[65px] 2xl:h-[70px] 2xl:w-[70px] rounded-lg cursor-pointer transition-opacity duration-300 ease-in-out',
        )}
      />
      <div
        style={{ opacity: isImageLoaded ? 0 : 1 }}
        className="absolute inset-0 bg-neutral-100 h-[70px] w-[70px] pointer-events-none transition-opacity duration-200 rounded-lg"
      />
    </div>
  );
};

export default Thumbnail;
