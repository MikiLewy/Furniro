/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wttfrfgskschebjijvzs.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/Furniro/**',
      },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'utfs.io' },
    ],
  },
};

module.exports = nextConfig;
