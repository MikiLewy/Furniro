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
    ],
  },
};

module.exports = nextConfig;
