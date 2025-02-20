import { User } from 'lucide-react';
import Link from 'next/link';

import { auth } from '@/auth';
import Logo from '@/components/atoms/logo';
import UserAvatar from '@/components/atoms/user-avatar';
import { getCategories } from '@/features/account/categories/api/lib/categories';
import CartSheet from '@/features/cart/components/organisms/cart-sheet';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import ClientNavbar from './navbar.client';

const ServerNavbar = async () => {
  const session = await auth();

  const user = session?.user;

  const categories = await getCategories();

  const userName = getUserNameBasedOnLoginType(
    user?.isOAuth,
    user?.name,
    user?.firstName,
    user?.lastName,
  );

  return (
    <nav
      className="sticky top-0 z-30 bg-white py-4 border-b border-b-[#eeeeec]
      ">
      <div className="max-w-[1680px] px-4 md:px-6 lg:px-8 mx-auto flex items-center md:justify-between">
        <div className="flex gap-3 md:gap-8 items-center">
          <ClientNavbar categories={categories} />
          <Logo />
        </div>
        <div className="ml-auto flex items-center gap-3 relative z-30">
          <CartSheet />
          <div className="flex">
            {user ? (
              <Link href="/orders" prefetch aria-label="Orders">
                <UserAvatar name={userName || ''} image={user?.image || ''} />
              </Link>
            ) : (
              <Link href="/login" prefetch aria-label="Login">
                <User className="w-5 h-5 cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ServerNavbar;
