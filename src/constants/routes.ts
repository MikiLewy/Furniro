import { BadgePercent, ShoppingBag } from 'lucide-react';

import { Route } from '../types/interfaces/route';

export const routes: Route[] = [
  {
    key: 'sale',
    title: 'Sale',
    href: '/products/sale',
    primary: true,
    icon: BadgePercent,
  },
  {
    key: 'products',
    title: 'Products',
    href: '/products',
    icon: ShoppingBag,
  },
];
