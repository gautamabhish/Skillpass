'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { QuestionType } from '@/components/ui/globals/Input';
export interface Duration {
  hours: number;
  minutes: number;
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  points: number;
  options?: string[];           // only for MCQs
  correctAnswers?: number[];    // indices for correct options (for MCQs)
  answerText?: string;          // for String type
  fileURL?: string;             // for File type
}


export interface CourseData {
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
}

interface CourseCreateContextProps {
  courseData: CourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

const defaultData: CourseData = {
  thumbURL: null,
  price: null,
  duration: {hours:0,minutes:0},
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
