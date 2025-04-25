import React from 'react'
import { Inter } from 'next/font/google'
import axios from 'axios'
import CreateQuizBasicDetails from '@/components/create/CreateQuizBasicDetails'
import CreaateRightSection from '@/components/create/CreaateRightSection'
import TimeConfiguration from '@/components/create/TimeConfiguration'
import QuizSettings from '@/components/create/QuizSettings'
import AddQuestions from '@/components/create/AddQuestions'
import { useCourseCreate } from '@/Providers/CreateProvider'
import { uploadToCloudinary } from '@/lib/cloudinaryUpload'

const inter = Inter({ subsets: ['latin'] })
// console.log(process.env.NEXT_PUBLIC_API_KEY)
const CreateQuiz = () => {
  const { courseData ,setCourseData } = useCourseCreate()
  const handleImgUpload = async (file:File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'edutrust'); // You can create an unsigned preset in Cloudinary
    formData.append('api_key', process.env.NEXT_PUBLIC_API_KEY as string); // Your Cloudinary API key
  
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_UPLOAD_URL as string, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('Upload successful:', response.data);
      setCourseData((prevData) => ({
        ...prevData,
        thumbURL: response.data.secure_url, // Assuming the response contains the URL of the uploaded image
        // Assuming the response contains the URL of the uploaded image
      }));
      console.log(courseData)
      
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };
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
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition" onClick={()=>{handleImgUpload(courseData.thumbFile as File)}}>
              Save Draft
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition" >
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
