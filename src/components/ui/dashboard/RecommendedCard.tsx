'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaRegClock, FaShareAlt, FaRupeeSign } from 'react-icons/fa';
import clsx from 'clsx';
import Image from 'next/image';
interface cardData {
  id: string;
  image: string;
  tag: string;
  color: string;
  title: string;
  description: string;
  time: number | null;
  verified?: boolean;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  price?: number;
}

function RecommendCard(props: cardData) {
  const {
    id,
    image,
    tag,
    color,
    title,
    description,
    time,
    verified = false,
    authorName = 'John Doe',
    authorRole = 'Course Creator',
    authorAvatar = 'https://avatar.iran.liara.run/public',
    price = 0,
  } = props;

  const router = useRouter();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent router push when clicking share
    const url = `${window.location.origin}/explore/${id}`;
    const text = `${title} - Check this out: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:opacity-90 duration-300 w-[90%] sm:w-[300px] md:w-[400px] cursor-pointer"
      onClick={() => router.push(`/explore/${id}`)}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-44 md:h-52 object-cover" />
        {verified && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Verified
          </span>
        )}
        <span className={clsx('absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded-md', color)}>
          {tag}
        </span>
      </div>

      <div className="p-4 space-y-2">
        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Image  src={authorAvatar} height={80} width={80} alt="Author" className="w-6 h-6 rounded-full object-cover" />
          <span>{authorName}</span>
          <span className="text-xs text-gray-400">• {authorRole}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        {/* Description */}
        <div className="relative group">
          <p className="text-sm text-gray-500 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
        </div>

        {/* Time, Price, Share */}
        <div className="flex items-center justify-between pt-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FaRegClock />
            {time ? `${time} mins` : 'N/A'}
          </span>
          <div className="flex items-center gap-3">
            {price > 0 ? (
              <span className="flex items-center gap-1 text-blue-500 font-semibold ">
                {/* <FaRupeeSign /> */}
                {price.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                })}
              </span>
            ) : (
              <span className="text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-xl text-xs">
                Free
              </span>
            )}

            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-700"
              title="Share"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendCard;
