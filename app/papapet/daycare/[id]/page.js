"use client"; // <-- Add this line at the top

import Bookcare from '@/Components/DayCare/Bookcare';
import NavPapaPet from '@/Components/Nav/NavPapaPet';
import { useParams } from 'next/navigation';
import React from 'react';
 

const Page = () => {
  const { id } = useParams(); 
  
  return (
    <div>
      <div className='w-full h-20 bg-red-200' >       <NavPapaPet/>  </div>

      <Bookcare/>
    </div>

  );
};


export default Page;


