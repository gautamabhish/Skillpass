'use client'
import { useAuth } from '@/Providers/AuthProvider';
import React, { useState, useRef, useEffect, ReactHTMLElement } from 'react';
import Link from 'next/link';
import HamburgerMenu from './Hamburger';
const NavbarLogged = () => {



  // const {signOut} = useAuth()

  return (
    <nav className="flex justify-between items-center p-4 bg-white relative">
      {/* Branding */}
      <div className="ml-8 text-2xl flex gap-4 font-bold text-[#095ef1]">
        <img src="./globe.svg" className="h-8 w-8 object-cover" alt="Logo" />
        <div>EduTrust</div>
      </div>

      {/* Right Side */}
      <div className="flex items-center mr-8 gap-6 relative">
        {/* Notification Bell */}
        <div className="cursor-pointer">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative" >
          <img
           
            src="./window.svg"
            alt="User Avatar"
            className="object-cover rounded-full h-8 w-8 cursor-pointer"
          />

          
        
        </div>
        <HamburgerMenu></HamburgerMenu>
      </div>
    </nav>
  );
};

export default NavbarLogged;
