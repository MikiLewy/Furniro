import Link from 'next/link';

import { Cart } from '../../../icons/cart';
import { Heart } from '../../../icons/heart';

import ClientNavbar from './navbar.client';

const ServerNavbar = async () => {
  return (
    <nav
      className="sticky top-0 z-30 bg-white flex items-center md:justify-between py-4 horizontal-spacing border-b border-b-[#eeeeec]
      ">
      <div className="flex gap-3 md:gap-8 items-center ">
        <ClientNavbar />
        <Link
          href="/"
          className="text-2xl font-bold text-secondary relative z-30">
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
        <Heart className={`w-6 h-6 fill-none cursor-pointer `} />
        <Cart className={`w-6 h-6 cursor-pointer`} />
      </div>
    </nav>
  );
};

export default ServerNavbar;
