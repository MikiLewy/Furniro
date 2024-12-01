import Link from 'next/link';

import ClientNavbar from './navbar.client';
import AccountPopover from '@/components/molecules/account-popover';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { auth } from '@/auth';

const ServerNavbar = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <nav
      className="sticky top-0 z-30 bg-white  py-4 horizontal-spacing border-b border-b-[#eeeeec]
      ">
      <div className="max-w-[1440px] mx-auto flex items-center md:justify-between">
        <div className="flex gap-3 md:gap-8 items-center ">
          <ClientNavbar />
          <Link
            href="/"
            className="text-2xl font-bold text-primary relative z-30">
            Furniro
          </Link>
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
          <Heart className={`w-6 h-6 cursor-pointer`} />
          <ShoppingCart className={`w-6 h-6 cursor-pointer`} />
          {user ? (
            <AccountPopover />
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ServerNavbar;
