'use client';

import { usePathname } from 'next/navigation';

import TabItem from '@/components/atoms/tab-item';
import Tabs from '@/components/organisms/tabs';

export default function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      key: 'products',
      title: 'Products',
      href: '/content/products',
    },
    {
      key: 'categories',
      title: 'Categories',
      href: '/content/categories',
    },
  ];

  return (
    <div className="w-full flex-1">
      <Tabs>
        {tabs.map(({ key, title, href }) => (
          <TabItem
            key={key}
            title={title}
            href={href}
            isActive={pathname === href}
          />
        ))}
      </Tabs>
      <div className="mt-4 ">{children}</div>
    </div>
  );
}
