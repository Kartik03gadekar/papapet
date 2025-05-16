"use client"; // <-- Add this line at the top

import BookGrooming from '@/Components/Grooming/BookGrooming';
import NavPapaPet from '@/Components/Nav/NavPapaPet';
import { useParams } from 'next/navigation';
import React from 'react';
 

const Page = () => {
  const { id } = useParams(); 
  
  return (
    <div>
      <div className='w-full h-20 ' >       <NavPapaPet/>  </div>

      <BookGrooming/>
    </div>

  );
};


export default Page;


