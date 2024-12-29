import { Crown } from '../icons/navigation/crown';
import GetInspired from '../icons/navigation/get-inspired';
import NewArrivals from '../icons/navigation/new-arrivals';
import Products from '../icons/navigation/products';
import Sale from '../icons/navigation/sale';
import { Route } from '../types/interfaces/route';

export const routes: Route[] = [
  {
    key: 'sale',
    title: 'Sale',
    href: '/products/sale',
    primary: true,
    icon: Sale,
  },
  {
    key: 'products',
    title: 'Products',
    href: '/products',
    icon: Products,
  },
  {
    key: 'bestsellers',
    title: 'Bestsellers',
    href: '/navbar/products/bestsellers',
    icon: Crown,
  },
  {
    key: 'newArrivals',
    title: 'New Arrivals',
    href: '/navbar/new-arrivals',
    icon: NewArrivals,
  },
  {
    key: 'getInspired',
    title: 'Get Inspired',
    href: '/navbar/get-inspired',
    icon: GetInspired,
  },
];
