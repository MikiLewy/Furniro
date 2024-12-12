'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signOut } from 'next-auth/react';
import UserAvatar from '../atoms/user-avatar';
import { Heart, LogOut, Settings, Truck } from 'lucide-react';

import { ExtendUser } from '@/next-auth';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  user: ExtendUser;
}

const AccountPopover = ({ user }: Props) => {
  const router = useRouter();

  const userName = user?.name
    ? user?.name
    : `${user?.firstName} ${user?.lastName}`;

  const dropdownItems = [
    {
      key: 'favorites',
      label: 'Favorites',
      icon: Heart,
      onClick: () => router.push('/favorites'),
    },
    {
      key: 'orders',
      label: 'My orders',
      icon: Truck,
      onClick: () => router.push('/orders'),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: Settings,
      onClick: () => router.push('/settings'),
    },
    {
      key: 'logout',
      label: 'Log out',
      icon: LogOut,
      destructive: true,
      onClick: () => signOut(),
    },
  ];

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={userName} image={user?.image || ''} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="py-3 px-2" align="end">
          <div className="flex flex-col text-sm text-center bg-primary/5 rounded-lg py-2 px-3">
            <p>Hello!</p>
            <p className="text-sm">{userName}</p>
          </div>

          {dropdownItems?.map(
            ({ key, icon: Icon, label, onClick, destructive }, index) => (
              <Fragment key={key}>
                {dropdownItems?.length - 1 === index ? (
                  <DropdownMenuSeparator />
                ) : null}
                <DropdownMenuItem
                  onClick={onClick}
                  className={cn(
                    destructive ? 'focus:bg-destructive/20' : '',
                    'cursor-pointer mt-1',
                  )}>
                  <Icon /> {label}
                </DropdownMenuItem>
              </Fragment>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountPopover;
