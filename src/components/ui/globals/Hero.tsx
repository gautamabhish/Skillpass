'use client';

import React from 'react';
import Image from 'next/image';
import heroImg from '/public/heroleft.png';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

const Hero = () => {
  const router = useRouter();
  const user = useAppSelector(state => state.user); // Replace with your selector

  const handleTakeQuiz = () => {
    if (user) {
      router.push('/explore');
    } else {
      router.push('/login');
    }
  };

  const handleCreateQuiz = () => {
    if (user) {
      router.push('/create-quiz/dereq');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around p-8 bg-gradient-to-b from-[#f1f7ff] to-[#ddeeff] py-16">
      {/* Left Section */}
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Test what you've learned
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Create and take quizzes to certify your knowledge from online courses.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleTakeQuiz}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Take a Quiz
          </button>
          <button
            onClick={handleCreateQuiz}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900"
          >
            Create a Quiz
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-8 md:mt-0 md:ml-10">
        <Image
          src={heroImg}
          alt="Hero"
          width={760}
          height={620}
          className="rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
