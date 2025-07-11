'use client';

import React, { useState, useEffect, useRef } from 'react';

type SearchBarProps = {
  quizzes: { title: string; creatorName?: string; quizTags?: string[] }[];
  onSearch: (key: string, value: string) => void;
  onSubmit: (key: string, value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ quizzes, onSearch, onSubmit }) => {
  const [query, setQuery] = useState('');
  const [searchKey, setSearchKey] = useState<'title' | 'creator' | 'tag'>('title');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update suggestions based on selected search key
  useEffect(() => {
    onSearch(searchKey, query);
    if (!query) {
      setSuggestions([]);
      return;
    }

    let matches: string[] = [];

    if (searchKey === 'title') {
      matches = quizzes.map(q => q.title || '');
    } else if (searchKey === 'creator') {
      matches = quizzes.map(q => q.creatorName || '');
    } else if (searchKey === 'tag') {
      matches = quizzes.flatMap(q => q.quizTags || []);
    }

    const filtered = matches
      .filter(val => val.toLowerCase().includes(query.toLowerCase()))
      .filter((v, i, self) => v && self.indexOf(v) === i) // remove duplicates
      .slice(0, 5);

    setSuggestions(filtered);
  }, [query, searchKey, quizzes, onSearch]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(searchKey, query);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (val: string) => {
    setQuery(val);
    onSubmit(searchKey, val);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex gap-2">
        <select
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value as any)}
          className="px-3 py-2 border rounded-l-xl border-cyan-500  border-b-amber-500  bg-white text-sm appearance-none"
        >
          <option value="title">Title</option>
          <option value="creator">Creator</option>
          <option value="tag">Tag</option>
        </select>

        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Search by ${searchKey}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(s)}
              className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
