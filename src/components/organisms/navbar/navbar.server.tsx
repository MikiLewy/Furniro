import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

import { auth } from '@/auth';
import Logo from '@/components/atoms/logo';
import AccountPopover from '@/components/molecules/account-popover';

import ClientNavbar from './navbar.client';

const ServerNavbar = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <nav
      className="sticky top-0 z-30 bg-white py-4 horizontal-spacing border-b border-b-[#eeeeec]
      ">
      <div className="max-w-[1680px] px-4 md:px-6 lg:px-8 mx-auto flex items-center md:justify-between">
        <div className="flex gap-3 md:gap-8 items-center ">
          <ClientNavbar />
          <Logo />
          <ul className="hidden md:flex  gap-4 relative z-30">
            <Link
              href="/products"
              className="text-base font-medium cursor-pointer hover:text-primary">
              Products
            </Link>
            <li className="text-base text-primary font-medium cursor-pointer">
              Sale
            </li>
          </ul>
        </div>
        <div className="ml-auto flex items-center gap-5 ">
          <ShoppingCart className={`w-5 h-5 cursor-pointer`} />
          {user ? (
            <AccountPopover user={user} />
          ) : (
            <Link href="/login">
              <User className="w-5 h-5 cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ServerNavbar;
