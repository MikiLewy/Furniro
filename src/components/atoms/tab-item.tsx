'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
  title: string;
  href: string;
  isActive: boolean;
}

const TabItem = ({ title, href, isActive }: Props) => {
  return (
    <Link href={href} prefetch>
      <li
        className={cn(
          'text-sm text-muted-foreground py-3',
          isActive ? 'text-primary border-b-2 border-primary' : '',
        )}>
        {title}
      </li>
    </Link>
  );
};

export default TabItem;
