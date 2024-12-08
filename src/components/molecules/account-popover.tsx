'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { signOut } from 'next-auth/react';
import UserAvatar from '../atoms/user-avatar';
import { LogOut } from 'lucide-react';

import { ExtendUser } from '@/next-auth';

interface Props {
  user: ExtendUser;
}

const AccountPopover = ({ user }: Props) => {
  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            name={
              user?.name ? user?.name : `${user?.firstName} ${user?.lastName}`
            }
            image={user?.image || ''}
          />
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
