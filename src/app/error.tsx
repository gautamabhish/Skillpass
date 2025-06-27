'use client';

import React from 'react';
import { Server, Home, ArrowLeft, WifiOff } from 'lucide-react';
import Link from 'next/link';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side */}
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-extrabold text-blue-700 leading-none">
            ERROR
          </h1>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
              Something went wrong
            </h2>
            <p className="text-lg text-blue-600 max-w-md mx-auto lg:mx-0">
              It seems our server hit a snag. Don’t worry — we’re on it!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/"
              className="group relative px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span>Go Home</span>
              </div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group px-8 py-4 border-2 border-blue-700 text-blue-700 font-semibold rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right side - Server */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <Server size={120} className="text-blue-400 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <WifiOff size={40} className="text-blue-500 animate-bounce" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
