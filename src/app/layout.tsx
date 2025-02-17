import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import '@app/globals.css';
import Providers from '@providers/providers';

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Furniro',
    template: '%s | Furniro',
  },
  description:
    'Discover Timeless Elegance and Functional Design at Our Furniture Shop. Explore a Wide Range of High-Quality Furniture Pieces for Your Home. Shop Now for the Perfect Blend of Style and Comfort.',
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || ''),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
