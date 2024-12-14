'use client';

import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import BottomTabsItem from '@/components/atoms/bottom-tabs-item';
import { accountRoutes } from '@/constants/account-routes';

const ClientBottomTabsNavigator = () => {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <ul className="flex justify-between w-full items-center">
      {accountRoutes?.map(({ title, key, href, icon }) => (
        <BottomTabsItem
          key={key}
          icon={icon}
          title={title}
          isActive={pathname === href}
          onClick={() => router.push(`${href}`)}
        />
      ))}
      <BottomTabsItem icon={LogOut} onClick={() => signOut()} title="Logout" />
    </ul>
  );
};

export default ClientBottomTabsNavigator;
