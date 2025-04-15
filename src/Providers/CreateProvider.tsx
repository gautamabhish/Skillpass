'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface CourseData {
  thumbURL: string | null;
  price: string | null;
  duration: string;
  totalPoints: number;
  Description: string;
  Tags: string[] | null;
  AllowBacktrack: boolean;
  Randomize: boolean;
  Questions:string[];
  QuizTitle:string;
}

interface CourseCreateContextProps {
  courseData: CourseData;
  setCourseData: React.Dispatch<React.SetStateAction<CourseData>>;
}

const defaultData: CourseData = {
  thumbURL: null,
  price: null,
  duration: '',
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
