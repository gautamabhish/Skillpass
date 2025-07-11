
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldOff, ArrowLeft, Lock, Ban } from 'lucide-react';
import Link from 'next/link';
const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-100 to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        {/* <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-rose-500 rounded-full animate-bounce"></div> */}
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-400 animate-pulse"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Text */}
        <div className="text-center lg:text-left space-y-8">
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 leading-none tracking-tighter">
              403
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] lg:text-[14rem] font-black text-rose-700/10 blur-sm leading-none tracking-tighter">
              403
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-700">
              Hold Up! You're Not Allowed
            </h2>
            <p className="text-lg text-rose-600 max-w-md mx-auto lg:mx-0">
              Looks like you don't have permission to access this section. Maybe try requesting access?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
             href='/creator-verification'
              className="group relative px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Lock size={20} />
                <span>Request Access</span>
              </div>
            </Link>

            <button
              onClick={() => router.push('/dashboard')}
              className="group px-8 py-4 border-2 border-rose-600 text-rose-700 font-semibold rounded-xl hover:bg-rose-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right - Server Lock Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-300/20 to-rose-500/20 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="relative">
                <ShieldOff size={120} className="text-rose-400 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Ban size={40} className="text-rose-500 animate-bounce" />
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse delay-200"></div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-rose-700 font-semibold">Access Control</p>
                <p className="text-rose-500 text-sm">Authorization Required</p>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-rose-700 text-white px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
              UNAUTHORIZED
            </div>
            <div className="absolute -bottom-4 -right-4 bg-rose-400 text-black px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              RESTRICTED
            </div>

            <div className="absolute top-1/4 right-0 w-full h-0.5 bg-pink-300 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-0 w-3/4 h-0.5 bg-rose-400 animate-pulse delay-75"></div>
            <div className="absolute top-1/2 right-1/4 w-1/2 h-0.5 bg-pink-500 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-700/10 to-transparent"></div>
    </div>
  );
};

export default UnauthorizedPage;
