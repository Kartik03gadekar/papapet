"use client"

import NavPapaPet from '@/Components/Nav/NavPapaPet'
import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Footer from '@/Components/Footer/Footer';
import Types from '@/Components/Accessoires/Types';
import AccessoiresProduct from '@/Components/Accessoires/AccessoiresProduct';


const page = () => {
  return (
    <>
      <div className="overflow-x-hidden">
    <NavPapaPet />
    <div className=" relative">
      <div className="  flex items-center justify-between h-screen px-8 py-[8vw] pl-[3vw]  
        max-md:flex-col max-md:px-5   max-md:h-fit max-md:pt-[1vw] pt-[5vw] ">
        
        {/* Left Content */}
         <div className="  flex flex-col gap-6 w-1/2 text-black  max-md:gap-4
           max-md:w-full max-md:text-start max-md:pb-[2vw] max-md:pl-[2vw] max-md:pt-[6vw]">

          <h1 className="text-5xl font-bold leading-tight gilroy max-md:text-3xl max-md:pl-0">
            Let Your  <span className="text-[#0D9899]">Pets</span> <br />
          Enjoy Some Play Time Pets
          </h1>

          <p className="text-lg w-[80%] max-md:w-full max-md:text-base max-md:px-0">
            Because your pet deserves more than just a meal—they deserve a
            bowl full of love, care, and premium nutrition every day.
          </p>

          <div className="flex items-center gap-4 max-md:pt-[0.2vw] pt-[1.7vw]  max-md:w-full max-md:justify-start">
              <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-4 max-md:py-2">
              Explore Now{" "}
              <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
            </button>
            
          </div>
        </div>

        {/* Right Content (Dog Image) */}
        <div className="max-md:w-full  bg-white w-[40%] flex justify-end max-md:justify-center max-md:mt-4  max-md:mb-1 max-md:mr-8">
          <img
            src="/Accessoiresimages.png"
            className="w-[30vw] object-cover max-md:w-[70vw]"
            alt="Dog"
          />
        </div>
      </div>

        
    </div>
    <Types/>
    <AccessoiresProduct/>
    <Footer />
    </div>
  </>
  )
}

export default page
