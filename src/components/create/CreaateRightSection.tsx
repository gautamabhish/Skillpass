import React from 'react'
import Image from 'next/image'
import { useCourseCreate } from '@/Providers/CreateProvider'
const CreaateRightSection = () => {
  const {courseData} = useCourseCreate();
  return (
    <div className="bg-white shadow-md  rounded-xl p-6 w-full max-w-sm h-fit">
    <h2 className="text-lg font-semibold mb-4">Tips & Overview</h2>
    <div className="space-y-3 text-sm text-gray-700">
      <div className="flex items-start gap-2">
        <Image
          src="/bulb.svg"
          width={20}
          height={20}
          alt="Tip Icon"
          className="mt-1"
        />
        <p>
          Use a variety of question types to test different levels of
          understanding.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <Image
          src="/clock.svg"
          width={20}
          height={20}
          alt="Tip Icon"
          className="mt-1"
        />
        <p>Set appropriate time limits to maintain engagement.</p>
      </div>
      <div className="flex items-start gap-2">
        <Image
          src="/shield.svg"
          width={20}
          height={20}
          alt="Tip Icon"
          className="mt-1"
        />
        <p>
          Enable negative marking for advanced testing scenarios.
        </p>
      </div>
    </div>
    <hr className="my-4 border-gray-200" />
    <div className="text-sm text-gray-700 space-y-1">
      <p className="font-bold text-lg ">Quiz Summary</p>
      <div className="flex justify-between">
        <span>Questions</span>
        <span className='font-bold'>{courseData.Questions.length}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Points</span>
        <span className='font-bold'>
  {courseData.Questions.reduce((item, item2) => item + item2.points, 0)}
</span>

      </div>
      <div className="flex justify-between">
        <span>Duration</span>
        <span className='font-bold'>{courseData.duration || '00'} minutes</span>
      </div>
    </div>
  </div>
  )
}

export default CreaateRightSection