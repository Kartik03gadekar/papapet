"use client"
import Footer from '@/Components/Footer/Footer'
import NavPapaPet from '@/Components/Nav/NavPapaPet'
import HeroSection from '@/Components/Petwalking/HeroSection'
import PetwalkerList from '@/Components/Petwalking/PetWalkerList'
import React from 'react'

const page = () => {
    return (
        <div className="w-full ">
        <nav className="w-full  h-[5vw]  bg-red-200  max-md:w-screen">     <NavPapaPet/> </nav>
       
        <HeroSection/>

        
         {/* Trusted Doctors Section */}
         <section className="py-20 px-6 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold max-md:text-xl">Find Pet Walkers Near you</h2>
        <input
          type="text"
          placeholder="Search Top grooming services Near you..."
          className="mt-4 p-2 w-full md:w-1/2 border border-gray-300 rounded-md placeholder:pl-2"
        />
      </section>
      <PetwalkerList/>
      <Footer/>
        </div>
      )
}

export default page
