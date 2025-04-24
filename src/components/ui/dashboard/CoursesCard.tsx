import React from 'react'
import Link from 'next/link'

interface CoursesProps {
  topic: string,
  modules: string,
  completed: string,
  bar: number,
}

export default function CoursesCard(props: CoursesProps) {
  const { topic, modules, completed, bar } = props;
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-4 min-w-[50%] ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600  font-bold">{topic}</p>
        <span className="text-blue-500 text-sm font-semibold cursor-pointer">{modules} modules</span>
      </div>
      <div className='bg-[#f5f5f5] w-full h-2 rounded-md'>
        <div className={`bg-blue-500 h-2 rounded transition-all duration-300`} style={{ width: `${bar}%` }}></div>
      </div>
      <div className='flex justify-between items-center'>
        <h2 className="text-sm font-bold text-gray-900">{completed} Complete</h2>
        <span><Link href='#' className='text-blue-500 text-sm hover:underline '>Continue <div className='text-blue-400' >{"-->"}</div></Link></span>
      </div>
    </div>
  )
}