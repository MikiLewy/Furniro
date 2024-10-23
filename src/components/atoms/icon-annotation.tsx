import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  icon: ReactNode;
  annotation: string;
  wrapperClassName?: string;
}

const IconAnnotation = ({ icon, annotation, wrapperClassName }: Props) => {
  const mergedClassName = twMerge('flex items-center gap-3', wrapperClassName);

  return (
    <div className={mergedClassName}>
      <div className="w-6 h-6">{icon}</div>
      <p className="font-medium text-base">{annotation}</p>
    </div>
  );
};

export default IconAnnotation;
