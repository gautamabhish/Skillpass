import React from 'react'
import { Inter } from 'next/font/google'
import CreateQuizBasicDetails from '@/components/CreateQuizBasicDetails'
import CreaateRightSection from '@/components/CreaateRightSection'
const inter = Inter({
  subsets:['latin']
})
const CreateQuiz = () => {
  return (
    <div className='bg-[#f9fafb] flex justify-around  p-4'>
      <div className='flex flex-col justify-start'>
      <p className={`text-2xl font-bold text-black ${inter.className}`}>Create a New Quiz</p>
      <p className='text=[#718ca9] font-xs'>Build quizzes to test knowlege and certify learners</p>
   
     <div className='pl-3'>
     <CreateQuizBasicDetails></CreateQuizBasicDetails>
     </div>
      </div>
      <CreaateRightSection></CreaateRightSection>
    </div>
  )
}

export default CreateQuiz