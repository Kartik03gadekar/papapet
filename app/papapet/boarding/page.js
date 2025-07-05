"use client "
import HeroSection from '@/Components/Boarding/Herosection'
import NavPapaPet from '@/Components/Nav/NavPapaPet'
import Footer from '@/Components/Footer/Footer'
import React from 'react'
import BoardingList from '@/Components/Boarding/BoardingList'

const page = () => {
  return (
    <div className='w-full h-screen  overflow-x-hidden'>

    <NavPapaPet/>
      <HeroSection/>
       {/* Trusted Doctors Section */}
       <section className="py-20 px-6 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold">Reliable Pet Boarding Near you</h2>
        <input
          type="text"
          placeholder="Search Top grooming services Near you..."
          className="mt-4 p-2 w-full md:w-1/2 border border-gray-300 rounded-md placeholder:pl-2"
        />
      </section>
      <BoardingList/>
      <Footer/>
    </div>
  )
}

export default page
