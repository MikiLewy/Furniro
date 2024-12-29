import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'gray' | 'info' | 'success';

interface Props {
  children: ReactNode;
  variant?: BadgeVariant;
  wrapperClassName?: string;
}

const getVariant = (variant: BadgeVariant) => {
  switch (variant) {
    case 'gray':
      return 'badge-gray';
    case 'info':
      return 'badge-info';
    case 'success':
      return 'badge-success';
    default:
      return 'badge-gray';
  }
};

const Badge = ({ children, wrapperClassName, variant = 'gray' }: Props) => {
  const mergedClassName = twMerge('badge', getVariant(variant), wrapperClassName);

  return <span className={mergedClassName}>{children}</span>;
};

export default Badge;
