'use client';

import { Metadata } from 'next';
import { usePathname } from 'next/navigation';

import TabItem from '@/components/atoms/tab-item';
import Tabs from '@/components/organisms/tabs';
import { usePermissions } from '@/permissions/can';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Manage shop content and products.',
};

export default function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const permissions = usePermissions();

  const tabs = [
    ...(permissions.can('read', 'AccountProducts')
      ? [
          {
            key: 'products',
            title: 'Products',
            href: '/content/products',
          },
        ]
      : []),
    ...(permissions.can('read', 'AccountCategories')
      ? [
          {
            key: 'categories',
            title: 'Categories',
            href: '/content/categories',
          },
        ]
      : []),
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
