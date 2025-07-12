'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { signIn, sendOtpForReset, updatePasswordWithOtp } from '@/store/userSlice';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotFlow, setIsForgotFlow] = useState(false);
  const [step, setStep] = useState<'enterEmail' | 'enterOtp'>('enterEmail');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(result)) {
        router.push('/explore');
      } else {
        throw new Error('Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await dispatch(sendOtpForReset({ email }));
      if (sendOtpForReset.fulfilled.match(result)) {
        setStep('enterOtp');
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const otpValue = otp.join('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const result = await dispatch(updatePasswordWithOtp({ email, otp: otpValue, newPassword }));

        if(updatePasswordWithOtp.fulfilled.match(result)) { 
          location.reload();
        }
      
    } catch (err: any) {
      setError(err.message || 'Could not update password');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen w-full justify-center items-center bg-gray-50 ${inter.className}`}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2">
          {isForgotFlow ? 'Reset Password' : 'Welcome Back'}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          {isForgotFlow ? 'Enter your email to reset password' : 'Login to your account'}
        </p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {!isForgotFlow ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>

            <p className="text-sm text-right">
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setIsForgotFlow(true);
                  setStep('enterEmail');
                }}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        ) : step === 'enterEmail' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {/* OTP Input */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  className="w-10 h-12 text-center text-xl border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (!val) return;
                    const newOtp = [...otp];
                    newOtp[index] = val;
                    setOtp(newOtp);
                    const next = document.getElementById(`otp-${index + 1}`);
                    if (next) (next as HTMLElement).focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      const newOtp = [...otp];
                      if (otp[index]) {
                        newOtp[index] = '';
                        setOtp(newOtp);
                      } else if (index > 0) {
                        const prev = document.getElementById(`otp-${index - 1}`);
                        if (prev) (prev as HTMLElement).focus();
                      }
                    }
                  }}
                  id={`otp-${index}`}
                />
              ))}
            </div>

            {/* New Password Fields */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              disabled={isLoading || otp.some(d => d === '')}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}

        {!isForgotFlow && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <Link href="/register" className="ml-2 text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
