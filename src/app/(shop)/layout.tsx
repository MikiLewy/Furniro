import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import '@app/globals.css';
import Footer from '@components/organisms/footer';
import Navbar from '@components/organisms/navbar';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col">
        {children}
        <Footer />
      </main>
    </div>
  );
}
