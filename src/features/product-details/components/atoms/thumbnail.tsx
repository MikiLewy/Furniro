import Image from 'next/image';

import { cn } from '@/lib/utils';

interface Props {
  src: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const Thumbnail = ({ isSelected, name, onClick, src }: Props) => {
  return (
    <Image
      src={src}
      alt={name}
      onClick={onClick}
      width={90}
      height={90}
      style={{ aspectRatio: '1' }}
      className={cn(
        isSelected ? 'opacity-100' : 'opacity-55',
        'object-cover h-[65px] w-[65px] 2xl:h-[70px] 2xl:w-[70px] rounded-lg cursor-pointer transition-opacity duration-300 ease-in-out',
      )}
    />
  );
};

export default Thumbnail;
