"use client "
import BookGrooming from '@/Components/Grooming/BookGrooming';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
      const { id } = useParams();
  return (
    <div>

      <BookGrooming id={id}/>
    </div>
  )
}

export default page
