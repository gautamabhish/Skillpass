'use client';

import React from 'react';
import Link from 'next/link';
import RecommendCard from '../ui/dashboard/RecommendedCard';

export type Quiz = {
  id: string;
  title: string;
  tag: string;
  creatorName: string;
  thumbnailURL?: string;
  description?: string;
  price?: number;
  duration?: number;
  color?: string;
  creatorProfilePic?: string;
  // add any other fields RecommendCard needs
};

export type TrendingProps = {
  data: Quiz[];
  category?: string;
  limit?: number;
};

export const Trending: React.FC<TrendingProps> = ({ data, category = 'All Categories', limit }) => {
  // 1. Filter by category if needed
  const filteredByCategory =
    category !== 'All Categories'
      ? data.filter((q) => q.tag === category)
      : data;

  // 2. Enforce limit
  const toShow = typeof limit === 'number'
    ? filteredByCategory.slice(0, limit)
    : filteredByCategory;

  // 3. Empty state
  if (!toShow.length) {
    return (
      <div className="text-center py-8 text-gray-600 text-lg">
        No quizzes found.
      </div>
    );
  }

  // 4. Render grid
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-8 px-4 py-2 items-center">

      {toShow.map((quiz ,index) => (
        <Link key={quiz.id} href={`/explore/${quiz.id}`} className="block ">
          <RecommendCard
            key={quiz.id || index}
          id={quiz.id}
          authorName={quiz.creatorName || 'Unknown'}
          image={quiz.thumbnailURL || 'https://static.vecteezy.com/system/resources/previews/011/066/660/original/quiz-time-button-quiz-time-speech-bubble-quiz-time-text-web-template-illustration-vector.jpg'}
          tag={quiz.tag || ''}
          color={quiz?.color || '#2563eb'}
          title={quiz.title}
          authorAvatar={quiz.creatorProfilePic }
          description={quiz.description || 'No description available'}
          price={quiz.price ?? 0}
          time={quiz.duration || 5}
          />
        </Link>
      ))}
    </div>
  );
};
