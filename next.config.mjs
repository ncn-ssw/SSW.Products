/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  
    swcMinify: true,        
  
    async rewrites() {
      return [
        {
          source: '/:path*', 
          destination: '/:path*',  
        },
      ];
    },
  };
  
  export default nextConfig;
  