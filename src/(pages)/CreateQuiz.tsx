import React from 'react'
import { Inter } from 'next/font/google'
import axios from 'axios'
import CreateQuizBasicDetails from '@/components/create/CreateQuizBasicDetails'
import CreaateRightSection from '@/components/create/CreaateRightSection'
import TimeConfiguration from '@/components/create/TimeConfiguration'
import QuizSettings from '@/components/create/QuizSettings'
import AddQuestions from '@/components/create/AddQuestions'
import { useCourseCreate } from '@/Providers/CreateProvider'
import AlertModal from '@/components/ui/modals/alertModal'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { handleImgUpload,handleAudioUpload,handleVideoUpload } from '@/lib/cloudinaryUpload'
// import { s } from 'framer-motion/client'

const inter = Inter({ subsets: ['latin'] })
const CreateQuiz = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState<string[]>([]);
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.id);
  const userName = useAppSelector((state) => state.user.name);
  const {courseData,setCourseData} = useCourseCreate();
   const [loading, setLoading] = React.useState(false);

  const validateCourseData = () => {
    if (!courseData.title ) {
      setMessage((prev) => [ 'Quiz title is required']);
      setShowModal(true);
      return false;
    }
  
    if (courseData.Questions.length === 0) {
     setMessage((prev) => ['At least one question is required']);
      setShowModal(true);
      return false;
    }
  
    for (const q of courseData.Questions) {
      if (!q.text  || q.options.length < 2 || q.correctAnswers.length === 0) {
       setMessage((prev) => [ 'All questions must have at least two options and one correct answer']);  
        setShowModal(true);
        return false;
      }
    }
  
    return true;
  };
  

const handleSubmit = async () => {
  setLoading(true);
  if (!validateCourseData()){
     setLoading(()=>false)
     return;}

  try {
    // Upload thumbnail if available
    if (courseData.thumbFile) {
      courseData.thumbURL = await handleImgUpload(courseData.thumbFile as File);
    }

  const updatedQuestions = await Promise.all(courseData.Questions.map(async (question) => {
  const updated = { ...question };

  try {
    if (question.AttachfileBlob && question.attachFileType) {
      if (question.attachFileType?.includes('audio')) {
        updated.attachFileURL = await handleAudioUpload(question.AttachfileBlob);
      } else if (question.attachFileType.includes('video')) {
        updated.attachFileURL = await handleVideoUpload(question.AttachfileBlob);
      } else if (question.attachFileType.includes('image')) {
        updated.attachFileURL = await handleImgUpload(question.AttachfileBlob);
      }
    }
  } catch (error) {
    console.error('Upload failed for question:', question, error);
  }

  return updated;
}));
// console.log('Updated Questions:', updatedQuestions);

    const payload = {
      title: courseData.title,
      description: courseData.description,
      duration: courseData.duration,
      difficulty: courseData.difficulty,
      creatorId: userId,
      creatorName: userName,
      courseId: courseData.courseId,
      courseURL: courseData.courseURL,
      thumbURL: courseData.thumbURL,
      price: Number(courseData.price),
      backtrack: courseData.backtrack,
      randomize: courseData.randomize,
      Tags: courseData.Tags,
      Questions: updatedQuestions,
      currency: courseData.currency,
    };

    const res = await axios.post("https://edutrust-backend.onrender.com/api/quiz/create", payload, {
      withCredentials: true,
    });

    if (res.status === 201) {
      router.push(`/create-quiz`);
    }
  } catch (err) {
    console.error('Quiz creation failed', err);
  }
  setLoading(() => false);
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
          {showModal && (
  <AlertModal
    title="Incomplete Quiz Details"
    message={message}
    onClose={() => setShowModal(false)}
  />
)}


          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition">
              Preview
            </button>
            {/* <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition" onClick={handleSubmit}>
              Save Draft
            </button> */}
           <button
  disabled={loading}
  className={`px-4 py-2 text-sm font-medium rounded-md text-white transition cursor-pointer 
    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
  onClick={handleSubmit}
>
  {loading ? 'Publishing...' : 'Publish Quiz'}
</button>
          </div>
        </div>
      </div>

      <CreaateRightSection />
    </div>
  )
}

export default CreateQuiz
