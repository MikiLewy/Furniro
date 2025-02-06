'use client';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';

import BottomTabsItem from '@/components/atoms/bottom-tabs-item';
import { accountRoutes } from '@/features/account/constants/account-routes';

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
          isActive={pathname.includes(href)}
          onClick={() => router.push(href)}
        />
      ))}
      <BottomTabsItem icon={LogOut} onClick={() => signOut()} title="Logout" />
    </ul>
  );
};

export default ClientBottomTabsNavigator;
