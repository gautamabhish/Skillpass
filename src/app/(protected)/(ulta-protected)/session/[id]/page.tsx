'use client';
import React from 'react'
import QuizInterface from '@/(pages)/sessionpage'
import { useParams } from 'next/navigation'
const SessionPage = () => {
  const  {id}  = useParams<{ id: string }>();
  return (
    <div>

        <QuizInterface id={id}></QuizInterface>
    </div>
  )
}

export default SessionPage