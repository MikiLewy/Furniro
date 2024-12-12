'use client';

import { usePathname } from 'next/navigation';

import SidebarItem from '@/components/atoms/sidebar-item';
import { getAccountRoutes } from '@/utils/get-account-routes';

const ClientSidebar = () => {
  const pathname = usePathname();

  const accountRoutes = getAccountRoutes();

  return (
    <ul className="flex flex-col gap-2 py-2">
      {accountRoutes.map(
        ({ title, key, onClick, href, icon: Icon, primary }) => (
          <SidebarItem
            key={key}
            icon={<Icon className="w-5 h-5" />}
            onClick={onClick}
            title={title}
            primary={primary}
            isActive={pathname === href}
          />
        ),
      )}
    </ul>
  );
};

export default ClientSidebar;
