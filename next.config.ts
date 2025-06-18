// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   allowedDevOrigins: ['http://192.168.1.8:3000'

   ],
   images: {  
    domains: [
      'avatar.iran.liara.run',
      'res.cloudinary.com',
    ]
   },
     eslint: {
    ignoreDuringBuilds: true, // ✅ disables linting during `next build`
  },
};



export default nextConfig;