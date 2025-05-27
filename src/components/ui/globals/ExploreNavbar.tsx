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
    <nav className="flex items-center justify-between px-6 py-4 bg-white relative z-50">
      {/* Logo */}
      <Link href='/' className={clsx('text-2xl cursor-pointer font-semibold text-blue-600', inter.className)}>
        EduTrust
      </Link>

      
        <HamburgerMenu />
    </nav>
  );
};

export default SearchNavbar;
