
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logodix.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kmeducationhub.de',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'bmmagazine.co.uk',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

    