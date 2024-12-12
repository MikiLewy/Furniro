import { Route } from '@/types/interfaces/route';
import { Heart, LogOut, Settings, Truck } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const getAccountRoutes = () => {
  const router = useRouter();

  const accountRoutes: Route[] = [
    {
      key: 'orders',
      title: 'Orders',
      icon: Truck,
      href: '/orders',
      onClick: () => router.push('/orders'),
    },
    {
      key: 'wishlist',
      title: 'Wishlist',
      icon: Heart,
      href: '/wishlist',
      onClick: () => router.push('/wishlist'),
    },
    {
      key: 'settings',
      title: 'Settings',
      href: '/settings',
      onClick: () => router.push('/settings'),
      icon: Settings,
    },
    {
      key: 'logout',
      title: 'Logout',
      onClick: () => signOut(),
      icon: LogOut,
    },
  ];

  return accountRoutes;
};
