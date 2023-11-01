import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Navbar from '@/app/[lang]/components/organisms/navbar';
import { Locale, i18n } from '@/i18n.config';

import '../../styles/globals.css';

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Furniro',
  description:
    'Discover Timeless Elegance and Functional Design at Our Furniture Shop. Explore a Wide Range of High-Quality Furniture Pieces for Your Home. Shop Now for the Perfect Blend of Style and Comfort.',
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={lang}>
      <body className={poppins.className}>
        <Navbar lang={lang} />
        {children}
      </body>
    </html>
  );
}
