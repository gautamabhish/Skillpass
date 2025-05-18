'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';

type Quiz = {
  id: string;
  title: string;
  dateCreated: string;
  status: 'Draft' | 'Published';
};

const quizzes: Quiz[] = []; // ← change to mock quizzes to test layout

const CreateQuizSection = () => {
  const hasQuizzes = quizzes.length > 0;

  return (<>        <NavbarLogged></NavbarLogged>
      <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Your Quizzes</h1>
          {/* <Link
            href="/create-quiz"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} /> Create Quiz
          </Link> */}
        </div>

        {hasQuizzes ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Created: {quiz.dateCreated}</p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
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
          <div className="text-center py-20">
            <img
              src="/empty-quiz.svg"
              alt="No quizzes"
              className="mx-auto w-64 mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Present is the best time to start!
            </h2>
            <p className="text-gray-500 mt-2">
              You haven’t created any quizzes yet. Let’s get started and make something awesome!
            </p>
            <Link
              href="/create-quiz/dereq"
              className="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              🚀 Create Your First Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
    </>

  );
};

export default CreateQuizSection;
