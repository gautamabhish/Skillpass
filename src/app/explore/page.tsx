'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import Navbar from '@/components/ui/globals/ExploreNavbar';
import Footer from '@/components/ui/globals/Footer';
import SearchBar from '@/components/ui/globals/SearchBar';
import { Trending } from '@/components/explore/Trending';
import { useExplore } from '@/hooks/useExplore';
import { useQuizTagFetch } from '@/hooks/useQuizTagFetch';
import ExploreLoading from '../loading';

type Quiz = {
  id: string;
  title: string;
  quizTags: Array<string>;
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
  const [searchKey, setSearchKey] = useState<'title' | 'creator' | 'tag'>('title');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Quiz[] | null>(null);

  const { data: searchedQuizzes, refetch: refetchSearch } = useQuizTagFetch(searchKey, searchValue);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useExplore();

  const allQuizzes = useMemo(() => {
    return data?.pages.flatMap((page) => page.courses.data) || [];
  }, [data]);

  const filtered = useMemo(() => {
    const base = searchResults ?? allQuizzes;
    if (selectedCategory === 'All Categories') return base;

    return base.filter(q =>
      q.quizTags?.some((tag:any) =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );
  }, [searchResults, allQuizzes, selectedCategory]);

  let loadMoreRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const node = loadMoreRef.current;
  if (!node || !hasNextPage) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  observer.observe(node);

  return () => {
    observer.disconnect();
  };
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleReset = () => {
    setSearchValue('');
    setSelectedCategory('All Categories');
    setSearchResults(null);
  };

  const handleSearchChange = (key: string, value: string) => {
    setSearchKey(key as 'title' | 'creator' | 'tag');
    setSearchValue(value);
  };

  const handleSearchSubmit = async (key: string, value: string) => {
    setSearchKey(key as 'title' | 'creator' | 'tag');
    setSearchValue(value);
    if (!value.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      const { data } = await refetchSearch();
      setSearchResults(data || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  if (isLoading) return <ExploreLoading />;

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] p-4 gap-y-8">
      <Navbar />

      <div className="flex flex-col items-center gap-y-6">
        {/* Search */}
        <SearchBar
          quizzes={allQuizzes}
          onSearch={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchValue('');
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
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-gray-100 hover:bg-red-500 text-gray-700"
          >
            Reset
          </button>
        </div>

        {/* Error */}
        {isError && <p className="text-red-500">Failed to load quizzes.</p>}

        {/* No results */}
        {filtered.length === 0 && (
          <p className="text-gray-500">No quizzes found. Try different filters or search.</p>
        )}

        {/* Trending Section */}
        {filtered.length > 0 && (
          <Trending
            category={selectedCategory}
            data={filtered}
            limit={undefined}
          />
        )}

        {/* Load More */}
        <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
          {isFetchingNextPage && <span>Loading ...</span>}
          {!hasNextPage && <span className="text-gray-500">Did you know? You can create new Quizzes.</span>}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ExplorePage;
