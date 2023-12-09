import { Crown } from '../icons/navigation/crown';
import GetInspired from '../icons/navigation/get-inspired';
import NewArrivals from '../icons/navigation/new-arrivals';
import Products from '../icons/navigation/products';
import Sale from '../icons/navigation/sale';
import { Route } from '../types/interfaces/Route';

export const routes: Route[] = [
  {
    titleKey: 'sale',
    href: '/products/sale',
    primary: true,
    icon: Sale,
  },
  {
    titleKey: 'products',
    href: '/products',
    icon: Products,
  },
  {
    titleKey: 'bestsellers',
    href: '/navbar/products/bestsellers',
    icon: Crown,
  },
  {
    titleKey: 'newArrivals',
    href: '/navbar/new-arrivals',
    icon: NewArrivals,
  },
  {
    titleKey: 'getInspired',
    href: '/navbar/get-inspired',
    icon: GetInspired,
  },
];
