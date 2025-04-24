"use client";
import React, { useEffect, useState } from 'react'
import CoursesCard from '@/components/ui/dashboard/CoursesCard'

interface CoursesProps {
  topic: string,
  modules: string,
  completed: string,
  bar: number,
}

const coursesData: CoursesProps[] = [
  {
    topic: "Advanced Web Development",
    modules: "12/15",
    completed: "80%",
    bar: 75,
  },
  {
    topic: "UI/UX Design Fundamentals",
    modules: "8/20",
    completed: "40%",
    bar: 40,
  },
];


function CoursesContainer() {
  const [data, setData] = useState<CoursesProps[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
      setData(coursesData);
    }, 2000)
  }, [])
  return (
    <section className='enrolled-courses mt-4 px-6 py-2 md:px-20 md:py-4 gap-4'>
      <h1 className='text-2xl font-bold'>Enrolled Courses</h1>
      <div className="container w-full flex flex-col md:flex-row justify-between gap-6 mt-4">
        {loaded ? (
          data.map((card, idx) => (
            <CoursesCard
              key={idx}
              topic={card.topic}
              modules={card.modules}
              completed={card.completed}
              bar={card.bar}
            />
          ))
        ) : (
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 min-w-[50%]"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 font-bold bg-gray-200 w-24 h-4 animate-pulse rounded"></p>
                <span className="bg-gray-200 w-20 h-4 animate-pulse rounded"></span>
              </div>
              <div className='bg-[#f5f5f5] w-full h-2 rounded-md'>
                <div className={`bg-gray-300 h-2 rounded animate-pulse`} style={{ width: `70%` }}></div>
              </div>
              <div className='flex justify-between items-center'>
                <h2 className="text-sm font-bold text-gray-900 bg-gray-200 w-24 h-4 animate-pulse rounded"></h2>
                <span className='bg-gray-200 w-16 h-4 animate-pulse rounded'></span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default CoursesContainer