import Link from 'next/link';
import { ElementType } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  href: string;
  primary?: boolean;
  isActive?: boolean;
  title: string;
  RouteIcon: ElementType;
}

const NavbarItem = ({ href, primary, RouteIcon, title, isActive }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        primary
          ? 'text-[#C9553E] hover:bg-primary-outlinedHover'
          : 'text-secondary-darker hover:bg-gray-50',
        isActive ? 'bg-gray-50 text-primary' : 'bg-transparent',
        isActive && primary ? 'bg-primary-outlinedHover' : 'bg-transparent',
        `flex items-center gap-2 text-sm px-4 py-3 rounded-3xl cursor-pointer transition-colors duration-500`,
      )}>
      <RouteIcon className="w-5 h-5 stroke-gray-300" />
      {title}
    </Link>
  );
};

export default NavbarItem;
