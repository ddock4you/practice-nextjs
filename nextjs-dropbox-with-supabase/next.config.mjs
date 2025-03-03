/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hnpxydqpuwhlqdvvlact.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
};

export default nextConfig;
