'use client';
import React, { useEffect, useState ,useRef} from 'react';
import { useAuth } from '@/Providers/AuthProvider';
import clsx from 'clsx';
import Link from 'next/link';


const HamburgerMenu = () => {
   
  const { user, signOut } = useAuth(); // assume you use this context
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="text-3xl text-gray-700 focus:outline-none"
      >
        ☰
      </button>

      {/* Slide-in menu from right */}
      <div
       ref={menuRef}
        className={clsx(
          'fixed top-6 right-0 w-64 h-lg bg-white shadow-lg text-black transition-transform duration-300 ease-in-out z-40 rounded-lg',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* <div className="p-4 border-b text-lg font-semibold">Menu</div> */}
        <div className="flex flex-col text-center bg-[#f5f5f5] rounded-2xl py-6 gap-2 ">
          {user ? (
            <>
              <Link href={'/dashboard'} className="text-left  px-4 py-2 hover:bg-blue-700 hover:text-white">Profile</Link>
               
 <Link href={'/explore'} className="text-left  bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Explore</Link>
              <Link href={'/create-quiz'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Create Quiz</Link>
              {/* <Link href={'/session'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Take Quiz</Link> */}
              <Link href={"/share-and-earn"} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Share and Earn  </Link>
              < Link href={'/about'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Support</Link>
              <Link href={'/'}
                onClick={signOut}
                className="text-left px-4 py-2 hover:bg-blue-700 bg-[#f5f5f5] hover:text-white"
              >
                Logout
              </Link>
            </>
          ) : (
         
            <>
              <Link href={'/'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Home</Link>
              <Link href={'/explore'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Explore</Link>
              <Link href={'/sign-in'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Login</Link>
              <Link href={'/sign-in'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Sign Up</Link>
              <Link href={'/about'} className="text-left bg-[#f5f5f5] px-4 py-2 hover:bg-blue-700 hover:text-white">Support</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
