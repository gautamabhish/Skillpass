'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { QuestionType } from '@/components/ui/globals/Input';

export interface Duration {
  hours: number;
  minutes: number;
  TimePerQuestion: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  options: string[];
  correctAnswers: number[];
  answerText?: string;
  AttachfileType?: string;
  AttachfileURL?: string;
  AttachfileBlob?: File;
  AttachpreviewURL?: string;
}

export interface CourseData {
  title: string;
  description: string;
  duration: Duration;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  creatorId: string;
  courseId?: string | null;
  courseURL?: string | null;
  thumbURL?: string | null;
  price: number;
  backtrack: boolean;
  randomize: boolean;
  totalPoints: number;
  Tags: string[] | null;
  Questions: Question[];
  thumbFile?: File;
  currency: 'INR' | 'USD' | 'EUR' | null;
}

interface CourseCreateContextProps {
  courseData: CourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

// ✅ Corrected defaultData
const defaultData: CourseData = {
  title: '',
  description: '',
  duration: { hours: 0, minutes: 0, TimePerQuestion: false },
  difficulty: 'Easy',
  creatorId: '',
  courseId: null,
  courseURL: null,
  thumbURL: null,
  price: 0,
  backtrack: false,
  randomize: false,
  totalPoints: 0,
  Tags: null,
  Questions: [],
  thumbFile: undefined,
  currency: 'INR',
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
