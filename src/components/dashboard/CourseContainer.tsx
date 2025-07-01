"use client";

import React from 'react';
import RecommendCard from '@/components/ui/dashboard/RecommendedCard';
import { useDashboard } from '@/hooks/useDashbaord';
import { Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { OwnedCard } from '../ui/dashboard/Ownedcard';

function CourseContainer() {
  const { data, isLoading } = useDashboard();
  const quizzes = data?.userQuizzes || [];

  return (
    <section className="flex flex-col gap-4 mt-4 px-4 sm:px-6 md:px-20 py-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Owned By You
      </h1>

<div className="grid gap-3 mt-4 place-items-center  grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="shadow-md rounded-2xl p-6 animate-pulse flex flex-col gap-4 w-full max-w-sm"
            >
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
            <div key={quiz.id || idx} className="w-full max-w-sm">
              <OwnedCard
                id={quiz.id}
                image={quiz.thumbnailURL || "https://static.vecteezy.com/system/resources/previews/011/066/660/original/quiz-time-button-quiz-time-speech-bubble-quiz-time-text-web-template-illustration-vector.jpg"}
                tag={quiz.tag || ""}
                color={quiz.color || ""}
                title={quiz.title}
                verified={quiz.verified}
                description={quiz.description}
                time={quiz.duration}
                authorName={quiz.creatorName}     
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center mt-10 flex flex-col items-center gap-4">
            <Compass className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 text-lg font-medium">
              No recommendations found at the moment.
            </p>
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

export default CourseContainer;
