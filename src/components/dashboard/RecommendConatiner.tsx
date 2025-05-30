"use client";

import React from 'react';
import RecommendCard from '@/components/ui/dashboard/RecommendedCard';
import { useDashboard } from '@/hooks/useDashbaord';
import { Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function RecommendedContainer() {
  const { data, isLoading } = useDashboard();

  const quizzes = data?.recommendedQuizzes || [];

  return (
    <section className='certificates flex flex-col gap-4 mt-4 px-6 py-2 md:px-20 md:py-4'>
      <h1 className='text-2xl font-bold flex items-center gap-2'>
        {/* <Compass className="w-6 h-6 text-green-600" /> */}
        Recommended for You
      </h1>

      <div className='w-full flex flex-col md:flex-row md:flex-wrap items-center gap-6 mt-4'>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 w-full md:w-[45%] animate-pulse">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 w-24 h-4 rounded"></div>
                <div className="bg-gray-200 w-20 h-4 rounded"></div>
              </div>
              <div className="bg-gray-300 w-full h-2 rounded"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 w-24 h-4 rounded"></div>
                <div className="bg-gray-200 w-16 h-4 rounded"></div>
              </div>
            </div>
          ))
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz: any, idx: number) => (
            <RecommendCard
              key={quiz.id || idx}
              image={quiz.thumbnail || "/placeholder.png"}
              tag={quiz.tag || ""}
              color={quiz.color || ""}
              title={quiz.title}
              description={quiz.description}
              time={quiz.time}
            />
          ))
        ) : (
          <div className="text-center w-full mt-10 flex flex-col items-center gap-4">
            <Compass className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 text-lg font-medium">No recommendations found at the moment.</p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Browse Quizzes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendedContainer;
