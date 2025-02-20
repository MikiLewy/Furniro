'use client';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';

import SidebarItem from '@/components/atoms/sidebar-item';
import { useAccountRoutes } from '@/features/account/hooks/use-account-routes';

const ClientSidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const accountRoutes = useAccountRoutes();

  return (
    <ul className="flex flex-col gap-2 py-2 ">
      {accountRoutes.map(({ title, key, href, icon: Icon, primary }) => (
        <SidebarItem
          key={key}
          icon={<Icon className="w-5 h-5" />}
          title={title}
          onClick={() => router.push(href)}
          primary={primary}
          isActive={pathname.includes(href)}
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
