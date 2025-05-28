'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react'; // Keeping this if you decide to add a "Create Quiz" button at the top later
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import { Rocket } from 'lucide-react'; // Adding Rocket icon for the empty state button
import Image from 'next/image';
type Quiz = {
  id: string;
  title: string;
  dateCreated: string;
  status: 'Draft' | 'Published';
};

// Mock quizzes to test the layout. You'll replace this with your actual data.
const quizzes: Quiz[] = [
  // { id: '1', title: 'Introduction to React Hooks', dateCreated: '2023-01-15', status: 'Published' },
  // { id: '2', title: 'Advanced CSS Techniques', dateCreated: '2023-02-20', status: 'Draft' },
  // { id: '3', title: 'JavaScript Fundamentals', dateCreated: '2023-03-10', status: 'Published' },
  // { id: '4', title: 'Data Structures in Python', dateCreated: '2023-04-05', status: 'Draft' },
  // { id: '5', title: 'Understanding Next.js Routing', dateCreated: '2023-05-01', status: 'Published' },
  // { id: '6', title: 'Cloud Computing Basics', dateCreated: '2023-05-15', status: 'Published' },
];

const CreateQuizSection = () => {
  const hasQuizzes = quizzes.length > 0;

  return (
    <>
      <NavbarLogged />
      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-white to-blue-50 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="flex justify-center items-center mb-10">
            <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">Your Quizzes</h1>
          </div>

          {hasQuizzes ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-gray-800 leading-tight">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">Created: {quiz.dateCreated}</p>
                  <span
                    className={`inline-block mt-4 text-sm px-3 py-1.5 rounded-full font-semibold ${
                      quiz.status === 'Published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {quiz.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
         <div className='flex justify-center'>
            <Image src={"/no.png"} alt='no quiz' height={280} width={280}></Image>
         </div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
                Present is the best time to start!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                You haven’t created any quizzes yet. Let’s get started and make something awesome!
              </p>
              <Link
                href="/create-quiz/dereq"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Rocket size={20} /> Create Your First Quiz
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateQuizSection;