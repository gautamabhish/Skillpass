'use client';

import React, { useState, useEffect, useRef } from 'react';

type SearchBarProps = {
  quizzes: { title: string }[];
  onSearch: (value: string) => void;
  onSubmit: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ quizzes, onSearch, onSubmit }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update suggestions whenever query changes
  useEffect(() => {
    onSearch(query);
    if (!query) {
      setSuggestions([]);
      return;
    }
    const filtered = quizzes
      .map((q) => q.title)
      .filter((t) => t.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setSuggestions(filtered);
  }, [query, quizzes, onSearch]);

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
      onSubmit(query);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setQuery(title);
    onSubmit(title);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for quizzes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

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
