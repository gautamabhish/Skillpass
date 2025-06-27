'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Server, Home, ArrowLeft, WifiOff } from 'lucide-react';

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 animate-pulse"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - 404 Text */}
        <div className="text-center lg:text-left space-y-8">
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 leading-none tracking-tighter">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] lg:text-[14rem] font-black text-blue-700/10 blur-sm leading-none tracking-tighter">
              404
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-blue-600 max-w-md mx-auto lg:mx-0">
              The page you're looking for isn't on this server. Maybe it took a coffee break?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => router.push('/explore')}
              className="group relative px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span>Go Explore</span>
              </div>
            </button>

            <button
              onClick={() => router.push('/dashboard')}
              className="group px-8 py-4 border-2 border-blue-700 text-blue-700 font-semibold rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right side - Server Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="relative">
                <Server size={120} className="text-blue-400 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <WifiOff size={40} className="text-blue-500 animate-bounce" />
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-blue-700 font-semibold">Server Status</p>
                <p className="text-blue-500 text-sm">Connection Lost</p>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
              ERROR
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-400 text-black px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              OFFLINE
            </div>

            <div className="absolute top-1/4 right-0 w-full h-0.5 bg-blue-300 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-0 w-3/4 h-0.5 bg-blue-400 animate-pulse delay-75"></div>
            <div className="absolute top-1/2 right-1/4 w-1/2 h-0.5 bg-blue-500 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-700/10 to-transparent"></div>
    </div>
  );
};

export default NotFound;
