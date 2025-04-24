import React from 'react'
import { Inter } from 'next/font/google'
import CreateQuizBasicDetails from '@/components/create/CreateQuizBasicDetails'
import CreaateRightSection from '@/components/create/CreaateRightSection'
import TimeConfiguration from '@/components/create/TimeConfiguration'
import QuizSettings from '@/components/create/QuizSettings'
import AddQuestions from '@/components/create/AddQuestions'
const inter = Inter({ subsets: ['latin'] })

const CreateQuiz = () => {
  return (
    <div className={`bg-[#f9fafb] flex justify-around p-6 gap-2 ${inter.className}`}>
      <div className='flex flex-col justify-start max-w-3xl w-full gap-4'>
        <p className={`text-2xl font-bold text-black ${inter.className}`}>Create a New Quiz</p>
        <p className='text-[#718ca9] text-sm'>Build quizzes to test knowledge and certify learners</p>

        <div className='pl-3 flex flex-col justify-start gap-6'>
          <CreateQuizBasicDetails />
          <TimeConfiguration />
          <AddQuestions></AddQuestions>
          <QuizSettings />

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
              Preview
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition">
              Save Draft
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
              Publish Quiz
            </button>
          </div>
        </div>
      </div>

      <CreaateRightSection />
    </div>
  )
}

export default CreateQuiz
