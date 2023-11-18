import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: ReactNode;
  className?: string;
}

const ImageCard = ({ className, children }: Props) => {
  const mergedClassName = twMerge('overflow-hidden rounded-3xl bg-gray-100  w-full', className);

  return <div className={mergedClassName}>{children}</div>;
};

export default ImageCard;
