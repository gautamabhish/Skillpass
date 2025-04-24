'use client'
import React from 'react'
import Switch from '../ui/globals/Switch'
import { useCourseCreate } from '@/Providers/CreateProvider'

const QuizSettings = () => {
  const{courseData,setCourseData}= useCourseCreate()
 

  return (
    <div className="bg-white flex flex-col justify-start gap-6 p-6">
      <div className="text-2xl font-semibold text-gray-800">Quiz Settings</div>

      {/* Backtracking Option */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-lg font-bold text-gray-700">Allow Backtracking</div>
          <div className="text-sm text-gray-500">Let learners navigate back to previous questions</div>
        </div>
        <Switch checked={courseData.AllowBacktrack} onChange={() => setCourseData(prev => ({...prev,AllowBacktrack:!prev.AllowBacktrack}))} />
      </div>

      {/* Randomize Option */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-gray-700">Randomize Questions</div>
          <div className="text-sm text-gray-500">Shuffle the order of questions for each learner</div>
        </div>
        <Switch checked={courseData.Randomize} onChange={() => setCourseData(prev =>({...prev,Randomize:!prev.Randomize}) )} />
      </div>
    </div>
  );
}

export default QuizSettings;
