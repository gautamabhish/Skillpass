'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { QuestionType } from '@/components/ui/globals/Input';
export interface Duration {
  hours: number;
  minutes: number;
  TimePerQuestion : Boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  options?: string[];
  correctAnswers?: number[];
  answerText?: string;
  fileType?: string;
  fileURL?: string;
  fileBlob?: File;        // <--- temporarily holds selected file before upload
  previewURL?: string;    // <--- for previewing the selected file
}

export interface CourseData {
  courseURL: string | null;
  thumbURL: string | null;
  price: string | null;
  duration: Duration;

  totalPoints: number;
  Description:string | null;
  Tags: string[] | null;
  AllowBacktrack: boolean;
  Randomize: boolean;
  Questions:Question[];
  QuizTitle:string;
  thumbFile?: File,
}

interface CourseCreateContextProps {
  courseData: CourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

const defaultData: CourseData = {
  courseURL: null,
  thumbURL: null,
 
  price: null,
  duration: {hours:0,minutes:0,TimePerQuestion:false},

  totalPoints: 0,
  Description: '',
  Tags: null,
  AllowBacktrack: false,
  Randomize: false,
  Questions:[],
  QuizTitle:'',
};

const CourseCreateContext = createContext<CourseCreateContextProps | null>(null);

export const useCourseCreate = () => {
  const context = useContext(CourseCreateContext);
  if (!context) {
    throw new Error('useCourseCreate must be used within a CourseCreateProvider');
  }
  return context;
};

const CourseCreateProvider = ({ children }: { children: ReactNode }) => {
  const [courseData, setCourseData] = useState<CourseData>(defaultData);

  return (
    <CourseCreateContext.Provider value={{ courseData, setCourseData }}>
      {children}
    </CourseCreateContext.Provider>
  );
};

export default CourseCreateProvider;
