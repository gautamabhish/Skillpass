'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { signUp, verifyOtp } from '@/store/userSlice';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(Array(6).fill('')); // 6-digit OTP as array
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const resultAction = await dispatch(signUp({ name, email, password }));
      if (signUp.fulfilled.match(resultAction)) {
        setShowOtpField(true);
      } else {
        throw new Error('Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const otpValue = otp.join('');
      const resultAction = await dispatch(verifyOtp({ email, otp: otpValue }));

      if (verifyOtp.fulfilled.match(resultAction)) {
        router.push('/sign-in');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${inter.className} flex items-center justify-center min-h-screen bg-gray-50 p-4`}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {showOtpField ? 'Verify OTP' : 'Create an Account'}
        </h2>

        <form onSubmit={showOtpField ? handleVerifyOtp : handleRegister} className="space-y-4">
          {!showOtpField && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
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
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white py-2 rounded-md transition cursor-pointer ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Registering...' : 'Sign Up'}
              </button>
              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  href="/sign-in"
                  className="ml-2 text-blue-600 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </>
          )}

          {showOtpField && (
            <>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    id={`otp-${index}`}
                    className="w-10 h-12 text-center text-xl border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (!val) return;

                      const newOtp = [...otp];
                      newOtp[index] = val;
                      setOtp(newOtp);

                      const nextInput = document.getElementById(`otp-${index + 1}`);
                      if (nextInput) nextInput.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        const newOtp = [...otp];
                        if (otp[index]) {
                          newOtp[index] = '';
                          setOtp(newOtp);
                        } else if (index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          if (prevInput) prevInput.focus();
                        }
                      }
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.some((digit) => digit === '')}
                className={`w-full mt-6 text-white py-2 rounded-md cursor-pointer font-semibold transition ${
                  isLoading || otp.some((digit) => digit === '')
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
