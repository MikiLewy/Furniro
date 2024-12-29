import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import '@app/globals.css';

import Logo from '@/components/atoms/logo';
import AuthBackgroundImage from '@/features/auth/components/atoms/auth-background-image';

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Furniro',
  description:
    'Discover Timeless Elegance and Functional Design at Our Furniture Shop. Explore a Wide Range of High-Quality Furniture Pieces for Your Home. Shop Now for the Perfect Blend of Style and Comfort.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="  mx-auto flex flex-col lg:flex-row h-screen ">
      <div className="flex-1 flex max-w-7xl 2xl:max-w-[1440px] flex-col justify-center gap-4 px-8 lg:px-12 lg:min-w-[450px] xl:min-w-[600px] mt-8">
        <Logo />
        {children}
      </div>
      <AuthBackgroundImage />
    </main>
  );
}
