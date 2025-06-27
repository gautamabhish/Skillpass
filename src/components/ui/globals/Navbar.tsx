import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-6 sm:px-12">
      {/* Left: Brand + Nav Links */}
      <div className="flex items-center gap-12">
        <Link href="/" className="text-[#1658e7e8] font-semibold text-2xl">
          SkillPass
        </Link>

        <div className="hidden sm:flex gap-8 text-[#616975]">
          <Link href="/explore" className="hover:text-slate-700 transition">
            Explore
          </Link>
          <Link href="/about" className="hover:text-slate-700 transition">
            About
          </Link>
        </div>
      </div>

      {/* Right: Auth Links */}
      <div className="flex gap-4 items-center">
        <Link href="/sign-in" className="hover:text-blue-600 transition">
          Login
        </Link>
        <Link
          href="/register"
          className="bg-[#2563eb] px-5 py-2.5 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
