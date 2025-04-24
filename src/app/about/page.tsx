'use client'; // if you're using App Router

import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

const AboutPage = () => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10 font-[${inter.className}]`}>
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-[#1658e7] mb-4">About Our Platform</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to our quiz platform! Our mission is to simplify the process of creating and managing quizzes for educators, students, and organizations.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-[#1658e7e8] mb-2">Our Vision</h2>
            <p className="text-gray-700">
              We aim to revolutionize online assessments by making them more interactive, accessible, and data-driven. Whether you're preparing for exams or conducting company evaluations, our tools are designed for ease and flexibility.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#1658e7e8] mb-2">Our Team</h2>
            <p className="text-gray-700">
              We're a team of passionate developers, educators, and designers working together to deliver a seamless experience. Innovation, collaboration, and user-centric design are at our core.
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} QuizApp. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
