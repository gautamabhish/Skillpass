'use client';

import React, { useState } from 'react';
import { Trending } from '@/components/explore/Trending';
import TopPerformer from '@/components/explore/TopPerformer';
import LeaderBoard from '@/components/explore/LeaderBoard';
import SearchNavbar from '@/components/ui/globals/ExploreNavbar';
import SearchBar from '@/components/ui/globals/SearchBar';
import WeeklyChallenge from '@/components/explore/WeeklyChallenge';
import Footer from '@/components/ui/globals/Footer';
import clsx from 'clsx';

const categories = ['All Categories', 'Programming', 'Design', 'Business', 'Marketing'];

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="flex flex-col gap-y-8 bg-[#f5f5f5] p-4 min-h-screen">
      <SearchNavbar />

      {/* SearchBar + Filters */}
      <div className="flex flex-col items-center gap-y-4">
        <SearchBar />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium border',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl font-semibold text-center pt-4">Popular Quizzes</h2>

        {/* Quiz Cards */}
        <Trending  />
        
        {/* View All Button */}
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          View All Quizzes
        </button>
      </div>

      {/* Optional Additions Later */}
      {/* <TopPerformer /> */}
      {/* <WeeklyChallenge /> */}
      {/* <LeaderBoard /> */}

      {/* Footer */}
      <div className="pt-6">
        <Footer />
      </div>
    </div>
  );
};

export default ExplorePage;
