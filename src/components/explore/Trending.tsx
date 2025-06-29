'use client';

import React, { useState } from 'react';
import RecommendCard from '../ui/dashboard/RecommendedCard';
import { useRouter } from 'next/navigation';

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
};

export type TrendingProps = {
  data: Quiz[];
  category?: string;
  limit?: number;
};

export const Trending: React.FC<TrendingProps> = ({ data, category = 'All Categories', limit }) => {
  const [disabledId, setDisabledId] = useState<string | null>(null);
  const router = useRouter();

  const filteredByCategory =
    category !== 'All Categories'
      ? data.filter((q) => q.tag === category)
      : data;

  const toShow = typeof limit === 'number'
    ? filteredByCategory.slice(0, limit)
    : filteredByCategory;

  if (!toShow.length) {
    return (
      <div className="text-center py-8 text-gray-600 text-lg">
        No quizzes found.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-2 items-center">
      {toShow.map((quiz) => {
        const isDisabled = disabledId === quiz.id;

        const handleClick = () => {
          if (isDisabled) return;
          setDisabledId(()=>quiz.id);
          router.push(`/explore/${quiz.id}`);

          setTimeout(() => {
            setDisabledId(null);
          }, 5000);
        };

        return (
          <div
            key={quiz.id}
            onClick={handleClick}
            className={`block transition ${
              isDisabled ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <RecommendCard
              id={quiz.id}
              authorName={quiz.creatorName || 'Unknown'}
              image={
                quiz.thumbnailURL ||
                '/DefaultThumbnail.jpg'
              }
              tag={quiz.tag || ''}
              color={quiz.color || '#2563eb'}
              title={quiz.title}
              authorAvatar={quiz.creatorProfilePic}
              description={quiz.description || 'No description available'}
              price={quiz.price ?? 0}
              time={quiz.duration || 5}
            />
          </div>
        );
      })}
    </div>
  );
};
