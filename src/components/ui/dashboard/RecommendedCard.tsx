import React from 'react';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa6';
import clsx from 'clsx';

interface cardData {
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
}

function RecommendCard(props: cardData) {
  const {
    image,
    tag,
    color,
    title,
    description,
    time,
    verified = true,
    authorName = 'John Doe',
    authorRole = 'Course Creator',
    authorAvatar = '/avatar-placeholder.png',
  } = props;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:opacity-80 duration-300 w-[300px] md:w-[400px]">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-44 md:h-52 object-cover"
        />
        {verified && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Verified
          </span>
        )}
        <span
          className={clsx(
            'absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded-md',
            color
          )}
        >
          {tag}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={authorAvatar}
            alt="Author"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>{authorName}</span>
          <span className="text-xs text-gray-400">• {authorRole}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-2 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FaRegClock />
            {time ? `${time} weeks` : 'N/A'}
          </span>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Get Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecommendCard;
