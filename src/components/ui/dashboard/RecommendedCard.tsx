import React from 'react'
import Link from 'next/link';
import { FaRegClock } from "react-icons/fa6";
import clsx from 'clsx';

interface cardData {
  image: string,
  tag: string,
  color: string ,
  title: string,
  description: string,
  time: number|null,
}

function RecommendCard(props: cardData) {
  const { image, tag, color, title, description, time } = props
  return (
    <div className=" bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 min-h-[350px] max-h-fit w-[300px] md:min-h-fit md:w-[400px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      <div className="relative">
        <img src={image} alt={title} className="rounded-md object-cover w-full h-42 md:h-52" />
        <span className={clsx(
          'absolute top-2 right-2 text-white font-semibold px-2 py-1 rounded-lg text-sm',
          color
        )}>
          {tag}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl overflow-ellipsis">{title}</p>
        <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-gray-500">
          <FaRegClock /> {time} weeks
        </span>
        <Link href="#" className="text-blue-500 hover:underline hover:text-blue-600">
          Get Now
        </Link>
      </div>
    </div>

  )
}

export default RecommendCard