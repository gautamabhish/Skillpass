'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import HamburgerMenu from './Hamburger';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
const inter = Inter({ subsets: ['latin'] });

// Mock data to simulate suggestions
const sampleSuggestions = ['Create Quiz jdschkchakshkcbdbmjcjsjbdschkchakshkcbdbmjcjsjb', 'Take Quiz', 'Quiz Results', 'Profile Settings', 'Support Center'];

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
 const user  = useAppSelector((state) => state.user.id);
  const filteredSuggestions = sampleSuggestions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white relative z-50">
      {/* Logo */}
      <Link href='/' className={clsx('text-2xl cursor-pointer font-semibold text-blue-600', inter.className)}>
        SkillPass
      </Link>

      {user?
        <HamburgerMenu />:
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-blue-600 ">Login
          </Link>
          </div>}
    </nav>
  );
};

export default Navbar;
