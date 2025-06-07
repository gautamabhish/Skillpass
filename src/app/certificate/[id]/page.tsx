'use client';
import React from 'react'
import Certificate from '@/components/ui/globals/Certificate'
import { useParams } from 'next/navigation'
const page = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div>
        <Certificate certificateId={id}></Certificate>
    </div>
  )
}

export default page