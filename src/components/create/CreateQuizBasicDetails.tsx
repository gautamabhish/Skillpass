'use client';
import PriceInput from '../ui/create/PriceInput';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { CourseData } from '@/Providers/CreateProvider';
import { useCourseCreate } from '@/Providers/CreateProvider';

const inter = Inter({ subsets: ['latin'] });

const MAX_WORDS = 150;

// Helper: limit by chars
const limitChars = (text: string, maxChars: number) =>
  text.slice(0, maxChars);

// Helper: count chars
const countChars = (text: string) => text.length;


const CreateQuizBasicDetails = () => {
  const [tagInput, setTagInput] = useState('');
  const { courseData, setCourseData } = useCourseCreate();

  const handleInputChange = <K extends keyof CourseData>(
    field: K,
    value: CourseData[K]
  ) => {
    if (typeof value === 'string') {
      value = limitChars(value, MAX_WORDS) as CourseData[K];
    }
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handleRemoveTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      Tags: prev.Tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      courseData.thumbFile = file;
      const fileUrl = URL.createObjectURL(file);
      setCourseData((prev) => ({
        ...prev,
        thumbURL: fileUrl,
      }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const fileUrl = URL.createObjectURL(droppedFile);
      setCourseData((prev) => ({
        ...prev,
        thumbURL: fileUrl,
      }));
    }
  };

  return (
    <div className={`${inter.className} bg-white space-y-4 px-4 pb-2`}>
      <div className="text-xl font-bold mt-2 pt-4 text-gray-800">
        Basic Quiz Details
      </div>

      <PriceInput courseData={courseData} handleInputChange={handleInputChange} />

      <div>
        <p className="font-medium text-gray-700">Course URL</p>
        <input
          type="text"
          value={courseData.courseURL || ''}
          onChange={(e) => handleInputChange('courseURL', e.target.value)}
          placeholder="Enter the course URL"
          title="Your quiz is linked to a course."
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-sm text-gray-500">
          {MAX_WORDS - countChars(courseData.courseURL || '')} words left
        </p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Course Thumbnail (if any)</p>
        <div
          className="w-full h-52 border-2 border-dashed rounded-lg border-gray-300 flex justify-center items-center hover:border-blue-500"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ position: 'relative' }}
        >
          {courseData.thumbURL ? (
            <img
              src={courseData.thumbURL}
              alt="Thumbnail Preview"
              className="w-full h-full object-fit rounded-lg"
            />
          ) : (
            <p className="text-gray-500 text-center">
              Drag & drop an image or click to select
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="font-medium text-gray-700">
          Quiz Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={courseData.title || ''}
          required
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter the quiz title"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-sm text-gray-500">
          {MAX_WORDS - countChars(courseData.title || '')} words left
        </p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Description</p>
        <textarea
          rows={4}
          value={courseData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter a description for your quiz"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
        <p className="text-sm text-gray-500">
          {MAX_WORDS - countChars(courseData.description || '')} words left
        </p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Tags</p>
        <div className="flex flex-wrap gap-2">
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(limitChars(e.target.value, MAX_WORDS))}
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
        <p className="text-sm text-gray-500">
          {MAX_WORDS - countChars(tagInput)} words left
        </p>
      </div>
    </div>
  );
};

export default CreateQuizBasicDetails;
