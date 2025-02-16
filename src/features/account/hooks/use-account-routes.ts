import { Heart, Settings, Truck, Image } from 'lucide-react';

import { usePermissions } from '@/permissions/can';
import { Route } from '@/types/interfaces/route';

export const useAccountRoutes = (): Route[] => {
  const permissions = usePermissions();

  const accountRoutes: Route[] = [
    {
      key: 'orders',
      title: 'Orders',
      icon: Truck,
      href: '/orders',
    },
    ...(permissions.can('read', 'AccountProducts') ||
    permissions.can('read', 'AccountCategories')
      ? [
          {
            key: 'content',
            title: 'Content',
            icon: Image,
            href: '/content/products',
          },
        ]
      : []),
    {
      key: 'wishlist',
      title: 'Wishlist',
      icon: Heart,
      href: '/wishlist',
    },
    {
      key: 'settings',
      title: 'Settings',
      href: '/settings',

      icon: Settings,
    },
  ];

  return accountRoutes;
};
