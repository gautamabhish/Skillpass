// app/explore/page.ts
//x
//@ts-nocheck
'use client';

import React, { useState, useEffect,useMemo } from 'react';
import clsx from 'clsx';

import Navbar from '@/components/ui/globals/ExploreNavbar';
import Footer from '@/components/ui/globals/Footer';
import SearchBar from '@/components/ui/globals/SearchBar';
import { Trending } from '@/components/explore/Trending';
import { useExplore } from '@/hooks/useExplore';
import { useQuizTitleFetch } from '@/hooks/useQuizTitleFetch';
import { useAppSelector } from '@/store/hooks';

type Quiz = {
  id: string;
  title: string;
  tag: string;
  creatorName: string;
  image?: string;
  description?: string;
  price?: number;
  duration?: number;
  status?: 'Published' | 'Draft';
  createdAt?: string;
  color?: string;
};

const categories = ['All Categories', 'Programming', 'Design', 'Business', 'Marketing'];

const ExplorePage: React.FC = () => {
 const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
const [searchTerm, setSearchTerm] = useState<string>('');
const [filtered, setFiltered] = useState<Quiz[]>([]);
const [showAll, setShowAll] = useState<boolean>(false);

const { data: searchedQuizzes, refetch: refetchSearch, isFetching } = useQuizTitleFetch(searchTerm);

// 🔁 All quizzes initially
const { data, isLoading, isError } = useExplore();
 const allQuizzes = useMemo(() => data?.courses || [], [data?.courses]);
 const userId = useAppSelector((state) => state.user?.id);
//  console.log('All Quizzes:', userId);
useEffect(() => {
  setFiltered(allQuizzes);
}, [allQuizzes]);

//  Search submit triggers query and updates UI
const handleSearchSubmit = async () => {
  try {
    const { data } = await refetchSearch();
    setFiltered(data || []);
    setSelectedCategory('All Categories');
  } catch (err) {
    console.error('Search failed:', err);
  }
};

///tegory filter only (no searchTerm filtering here)
 useEffect(() => {
    if (selectedCategory === 'All Categories') {
      console.log(allQuizzes)
      setFiltered(allQuizzes);
    } else {
     const result = allQuizzes.filter(q =>
  q?.quizTags?.find(tag => tag.toLowerCase().includes( selectedCategory.toLowerCase()))
);

      setFiltered(result);
    }
  }, [selectedCategory, allQuizzes]); 

// 🖋 Handle typing in input
const handleSearchChange = (val: string) => setSearchTerm(val);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] p-4 gap-y-8">
      <Navbar />

      <div className="flex flex-col items-center gap-y-6">
        {/* Search + Autocomplete */}
        <SearchBar
          quizzes={allQuizzes}
          onSearch={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchTerm('');
              }}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium border transition',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Title + Show All Toggle */}
        <div className="w-full max-w-4xl flex justify-end items-center px-4">
          {/* <h2 className="text-2xl font-semibold">Popular Quizzes</h2> */}
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition "
          >
            {showAll ? 'Show Top 3' : 'Show All Quizzes'}
          </button>
        </div>

        {/* Loading / Error */}
        {isLoading && <p>Loading quizzes…</p>}
        {isError && <p className="text-red-500">Failed to load quizzes.</p>}

        {/* Quiz Grid via Trending */}
        {!isLoading && !isError && (
          <Trending
            category={selectedCategory}
            data={filtered}
            limit={showAll ? undefined : 3}
          />
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ExplorePage;
