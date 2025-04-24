'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import HamburgerMenu from './Hamburger';
import Link from 'next/link';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

// Mock data to simulate suggestions
const sampleSuggestions = ['Create Quiz jdschkchakshkcbdbmjcjsjbdschkchakshkcbdbmjcjsjb', 'Take Quiz', 'Quiz Results', 'Profile Settings', 'Support Center'];

const SearchNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const filteredSuggestions = sampleSuggestions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative z-50">
      {/* Logo */}
      <Link href='/' className={clsx('text-2xl cursor-pointer font-semibold text-blue-600', inter.className)}>
        EduTrust
      </Link>

      {/* Search section */}
      <div className="flex-1 flex justify-end items-center space-x-4 relative">
        {/* Toggleable search input */}
        {showSearch && (
          <div className="relative w-full max-w-sm  transition-all  duration-300">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Suggestions */}
            {query && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50 max-h-48 overflow-y-auto overflow-x-hidden ">
                {filteredSuggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2   hover:bg-blue-700 hover:text-white cursor-pointer"
                    onClick={() => {
                      setQuery(suggestion);
                      setShowSearch(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Image
          src="/search.svg"
          alt="Search"
          width={60}
          height={60} 
          onClick={() => setShowSearch(!showSearch)}
          className="px-4 py-2 text-white  hover:text-blue-500 transition"
        />
        

        {/* Hamburger Menu */}
        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default SearchNavbar;
