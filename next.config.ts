import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   allowedDevOrigins: [
    'http://192.168.1.7',      // if you open http://192.168.1.7
    'http://192.168.1.7:3000', // if you include the port
  ],
  /* config options here */
   images: {
    // Option A: simple domains list
    remotePatterns: [new URL('https://avatar.iran.liara.run/public')],
   },
};

export default nextConfig;
