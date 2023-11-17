import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: ReactNode;
  className?: string;
}

const ImageCard = ({ className, children }: Props) => {
  const mergedClassName = twMerge('overflow-hidden rounded-3xl bg-gray-100 h-[450px] md:h-[500px] lg:h-[600px] w-full', className);

  return <div className={mergedClassName}>{children}</div>;
};

export default ImageCard;
