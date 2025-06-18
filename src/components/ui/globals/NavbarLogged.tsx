'use client';

import { useAppSelector } from '@/store/hooks';
import React, { useState, useRef, useEffect, use } from 'react';
import HamburgerMenu from './Hamburger';
import { uploadProfileImage } from '@/lib/uploadProfilePic';
import { useDashboard } from '@/hooks/useDashbaord';
import Image from 'next/image';
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;

const NavbarLogged = () => {
  const {data,isLoading} = useDashboard();
  const profilePicRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user);

  const [avatarUrl, setAvatarUrl] = useState<string>(data?.profilePic ||'/user.jpg');

  // useEffect(() => {
  //   if (data?.proflePic) {
  //     setAvatarUrl(data.proflePic);
  //   }
  // }, [data]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    try {
    const uploadedUrl = await uploadProfileImage(file, user.id);
    setAvatarUrl(uploadedUrl);
  } catch (err) {
    console.error('Failed to upload image:', err);
  }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white relative">
      {/* Branding */}
      <div className="ml-8 text-2xl flex gap-4 font-bold text-[#095ef1]">
        <img src="./globe.svg" className="h-8 w-8 object-cover" alt="Logo" />
        <div>SkillPass</div>
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

        {/* Hidden File Input */}
        <input
          type="file"
          className="hidden"
          ref={profilePicRef}
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Avatar */}
        <div className="relative">
          <Image
            width={42}
            height={42}
            src={avatarUrl}
            alt="User Avatar"
            className="object-cover rounded-full h-8 w-8 cursor-pointer"
            onClick={() => profilePicRef.current?.click()}
          />
        </div>

        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default NavbarLogged;
