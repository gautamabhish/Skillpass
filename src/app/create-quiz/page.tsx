'use client'
import React from 'react'
import NavbarLogged from '@/components/ui/NavbarLogged'
import CreateQuiz from '@/(pages)/CreateQuiz'
import Input from '@/components/ui/Input'
import CourseCreateProvider from '@/Providers/CreateProvider'
import { QuestionType } from '@/components/ui/Input'
const page = () => {
  return (
    <CourseCreateProvider>
    <div>
        <NavbarLogged></NavbarLogged>
        <CreateQuiz></CreateQuiz>


    </div>
    </CourseCreateProvider>
  )
}

export default page