'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useCourseCreate } from '@/Providers/CreateProvider';
import Input from '../ui/globals/Input';
import { QuestionType } from '../ui/globals/Input';
const inter = Inter({ subsets: ['latin'] });

const CreateQuizBasicDetails = () => {
  // Using local state for the tag input field:
  const [tagInput, setTagInput] = useState('');
  
  // Getting data and setter from the provider:
  const { courseData, setCourseData } = useCourseCreate();

  // Handler to update any field in the provider state:
  const handleInputChange = (
    field: keyof typeof courseData,
    value: string
  ) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add a new tag if it's not already present:
  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && (!courseData.Tags || !courseData.Tags.includes(newTag))) {
      setCourseData((prev) => ({
        ...prev,
        Tags: prev.Tags ? [...prev.Tags, newTag] : [newTag],
      }));
      setTagInput('');
    }
  };

  // Remove a tag from the shared state:
  const handleRemoveTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      Tags: prev.Tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  return (
    <div className={`${inter.className} bg-white space-y-4 px-4 pb-2 `}>
      <div className="text-xl font-bold mt-2 pt-4 text-gray-800">
        Basic Quiz Details
      </div>

      {/* Course URL Input */}
      <div>
        <p className="font-medium text-gray-700">Course URL</p>
        <input
          type="text"
          value={courseData.thumbURL || ''}
          onChange={(e) => handleInputChange('thumbURL', e.target.value)}
          placeholder="Enter the course URL"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
      <p className="font-medium text-gray-700">Course Thumbanil (if any)</p>
      <Input type={QuestionType.File} onChange={(e)=>{console.log(e)}}></Input>
      </div>
      {/* Quiz Title Input */}
      {/* NOTE: Update your provider to have a distinct key for quiz title if needed */}
      <div>
        <p className="font-medium text-gray-700">Quiz Title</p>
        <input
          type="text"
          value={courseData.QuizTitle || ''}
          onChange={(e) => handleInputChange('QuizTitle', e.target.value)}
          placeholder="Enter the quiz title"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Description Input */}
      <div>
        <p className="font-medium text-gray-700">Description</p>
        <textarea
          rows={4}
          value={courseData.Description || ''}
          onChange={(e) => handleInputChange('Description', e.target.value)}
          placeholder="Enter a description for your quiz"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      {/* Tags Section */}
      <div>
        <p className="font-medium text-gray-700">Tags</p>
        <div className="flex flex-wrap gap-2 md:max-w-96 lg:min-w-2xl lg:max-w-3xl whitespace-normal break-words">
          {courseData.Tags?.map((tag, idx) => (
            <div
              key={idx}
              className="bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-500 hover:text-red-500 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizBasicDetails;
