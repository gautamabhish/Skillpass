'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import Image from 'next/image';
import NavbarLogged from '@/components/ui/globals/NavbarLogged';
import { useGetCreations } from '@/hooks/useGetCreations';
import { Bar } from 'react-chartjs-2';

type Quiz = {
  id: string;
  title: string;
  price: number;
  purchases: number;
  earnings: number;
};

const CreateQuizSection = () => {
  const { data: quizzes = [], isLoading, isError } = useGetCreations();

  const totalEarnings = useMemo(() => {
    return quizzes.reduce((sum:number, quiz:Quiz) => sum + quiz.earnings, 0);
  }, [quizzes]);

  const topQuizzes = useMemo(() => {
    return [...quizzes]
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 3);
  }, [quizzes]);

  const chartData = {
    labels: quizzes.map((q:Quiz) => q.title),
    datasets: [
      {
        label: 'Earnings (₹)',
        data: quizzes.map((q:Quiz) => q.earnings),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
      <NavbarLogged />
      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-white to-blue-50 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* <div className="flex justify-center items-center mb-10">
            <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">Your Quiz Dashboard</h1>
          </div> */}

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800">Total Earnings</h2>
            <p className="text-3xl text-green-600 font-bold mt-2">₹{totalEarnings}</p>
          </div>

          {/* Optional: Earnings Chart */}
          {quizzes.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Earnings Breakdown</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          )}

          {/* Top Performing Quizzes */}
          {topQuizzes.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performing Quizzes</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {topQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">Purchases: {quiz.purchases}</p>
                    <p className="text-sm text-blue-700 mt-1">Earnings: ₹{quiz.earnings}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User's Quizzes */}
          <div className="mt-10">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Quizzes</h2> */}
            {quizzes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzes.map((quiz:Quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">Purchases: {quiz.purchases}</p>
                    <p className="text-sm text-green-700 mt-1 font-semibold">Earnings: ₹{quiz.earnings}</p>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto mt-10">
                  <div className="flex justify-center mb-6">
                    <Image src="/no.png" alt="no quiz" height={280} width={280} />
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
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuizSection;
