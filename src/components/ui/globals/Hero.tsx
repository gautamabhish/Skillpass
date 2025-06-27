'use client';

import React from 'react';
import Image from 'next/image';
import heroImg from '/public/heroleft.png';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

const Hero = () => {
  const router = useRouter();
  const user = useAppSelector(state => state.user);

  const handleTakeQuiz = () => {
    if (user) {
      router.push('/explore');
    } else {
      router.push('/login');
    }
  };

  const handleCreateQuiz = () => {
    if (user) {
      router.push('/create-quiz/');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between p-6 sm:p-8 lg:p-16 bg-gradient-to-b from-[#f1f7ff] to-[#ddeeff] min-h-[550px]">
      {/* Left Section (text) */}
      <div className="max-w-xl text-center md:text-left mt-8 md:mt-0">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 leading-tight">
          Test what you've learned
        </h1>
        <p className="text-base sm:text-lg mb-6 text-gray-600">
          Create and take quizzes to certify your knowledge from online courses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={handleTakeQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Take a Quiz
          </button>
          <button
            onClick={handleCreateQuiz}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Create a Quiz
          </button>
        </div>
      </div>

      {/* Right Section (image) */}
      <div className="w-full max-w-lg">
        <Image
          src={heroImg}
          alt="Hero"
          width={760}
          height={620}
          className="rounded-lg w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
