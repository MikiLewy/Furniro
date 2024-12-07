'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signOut, useSession } from 'next-auth/react';
import UserAvatar from '../atoms/user-avatar';
import { LogOut } from 'lucide-react';

const AccountPopover = () => {
  const { data: session } = useSession();

  const user = session?.user;

  console.log({ user });

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={user?.name || ''} image={user?.image || ''} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}>
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>{' '}
    </div>
  );
};

export default AccountPopover;
