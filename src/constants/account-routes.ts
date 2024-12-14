import { Heart, Settings, Truck } from 'lucide-react';

import { Route } from '@/types/interfaces/route';

export const accountRoutes: Route[] = [
  {
    key: 'orders',
    title: 'Orders',
    icon: Truck,
    href: '/orders',
  },
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
