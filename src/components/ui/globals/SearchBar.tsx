'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const suggestions = [
  'React',
  'UI/UX Design',
  'Ethical Hacking',
  'Machine Learning',
  'Communication Skills',
];

const SearchBar = () => {

  const [query, setQuery] = useState('');

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative flex justify-center items-center w-xl">
    
        <div className="relative w-full flex flex-col justify-center max-w-sm transition-all duration-300">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for quizzes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className=''>

         
          {query && filteredSuggestions.length > 0 && (
            <ul className="  mt-1 bg-white border border-blue-500 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setQuery(suggestion);
                   
                  }}
                  className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>


    
    </div>
  );
};

export default SearchBar;
