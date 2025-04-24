'use client';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/Providers/AuthProvider';
import { useRouter } from 'next/router';


const inter = Inter({
  subsets:["latin"]
})



const SignInPage = (SignUp:boolean=false) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { signIn, signUp } = useAuth();
  async function Register(e:any){
    e.preventDefault();
    try {
      if (isSignUp) {
        const status = await signUp(name, email, pass);
        if(status===200){
          setIsSignUp(false);
        }
      } else {
        await signIn(email, pass);
      }
    } catch (err) {
      console.error('Auth Error:', err);
    }
  }
  return (
    <div className={`flex h-screen w-full justify-center font-[${inter.className}] `}>
      {/* Left Side Image Carousel */}
    

      {/* Right Side Auth Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-[90%] max-w-md shadow-xl border rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-center text-[#1658e7e8] mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            {isSignUp ? 'Join us and explore your potential' : 'Login to continue'}
          </p>

          <button className="flex items-center justify-center gap-3 bg-white border w-full px-4 py-2 rounded-md shadow hover:shadow-md transition mb-4">
            <FcGoogle className="text-xl" />
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </button>

          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          <form className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                className="w-full px-4 py-2 border rounded-md focus:outline-[#1658e7e8]"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 border rounded-md focus:outline-[#1658e7e8]"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPass(e.target.value)}
              value={pass}
              className="w-full px-4 py-2 border rounded-md focus:outline-[#1658e7e8]"
            />
            <button className="w-full bg-[#1658e7e8] text-white py-2 rounded-md hover:bg-[#1658e7] transition" onClick={(e)=>Register(e)}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-[#1658e7] font-semibold"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
