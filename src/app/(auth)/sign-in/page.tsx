'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { signIn } from '@/store/userSlice';

const inter = Inter({ subsets: ['latin'] });

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(resultAction)) {
        router.push('/explore');
      } else {
        throw new Error('Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className={`flex h-screen w-full justify-center items-center bg-gray-50 ${inter.className}`}>      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Login to your account
        </p>

        <button className="flex items-center justify-center gap-3 bg-white border w-full px-4 py-2 rounded-md shadow hover:shadow-md transition mb-4">
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <button
            onClick={() => router.push('/register')}
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
