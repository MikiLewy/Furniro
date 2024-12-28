'use client';

import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import SidebarItem from '@/components/atoms/sidebar-item';
import { accountRoutes } from '@/features/account/constants/account-routes';

const ClientSidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <ul className="flex flex-col gap-2 py-2 ">
      {accountRoutes.map(({ title, key, href, icon: Icon, primary }) => (
        <SidebarItem
          key={key}
          icon={<Icon className="w-5 h-5" />}
          title={title}
          onClick={() => router.push(href)}
          primary={primary}
          isActive={pathname === href}
        />
      ))}
      <SidebarItem
        icon={<LogOut className="w-5 h-5" />}
        title="Logout"
        onClick={() => signOut()}
      />
    </ul>
  );
};

export default ClientSidebar;
