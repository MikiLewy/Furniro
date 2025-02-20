'use client';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';

import BottomTabsItem from '@/components/atoms/bottom-tabs-item';
import { useAccountRoutes } from '@/features/account/hooks/use-account-routes';

const ClientBottomTabsNavigator = () => {
  const router = useRouter();

  const pathname = usePathname();

  const accountRoutes = useAccountRoutes();

  return (
    <ul className="flex justify-between w-full items-center">
      {accountRoutes?.map(({ title, key, href, icon }) => (
        <BottomTabsItem
          key={key}
          icon={icon}
          title={title}
          isActive={pathname.includes(href)}
          onClick={() => router.push(href)}
        />
      ))}
      <BottomTabsItem icon={LogOut} onClick={() => signOut()} title="Logout" />
    </ul>
  );
};

export default ClientBottomTabsNavigator;
