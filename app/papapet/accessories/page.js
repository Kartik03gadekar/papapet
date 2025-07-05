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
      <div className="  w-[100%] gap-[20vw] flex items-start justify-between h-screen px-10  
      max-md:flex-col max-md:px-[6vw] max-md:gap-[0vw] max-md:h-fit max-md:pt-[1vw] pt-[6vw] ">
        
        {/* Left Content */}
        <div className=" max-md:px-2 flex flex-col gap-6 w-[60%] text-black  pt-[4vw]
         max-md:w-full max-md:text-start max-md:pb-[10vw] max-md:pl-[2vw] max-md:pt-[12vw]">
          <h1 className="text-5xl font-bold leading-tight gilroy max-md:text-3xl max-md:pl-0">
            Let Your  <span className="text-[#0D9899]">Pets</span> <br />
          Enjoy Some Play Time<span className="text-[#FFAD22]">Pets</span>
          </h1>
          <p className="text-lg w-[100%] max-md:w-full max-md:text-base max-md:px-0">
            Because your pet deserves more than just a meal—they deserve a
            bowl full of love, care, and premium nutrition every day.
          </p>
          <div className=" flex items-center gap-4 max-md:w-full max-md:justify-start">
            <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-4 max-md:py-1">
              Explore Now{" "}
              <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
            </button>
            
          </div>
        </div>

        {/* Right Content (Dog Image) */}
        <div className="bg-white w-[40%] flex justify-end max-md:w-full max-md:justify-center max-md:mt-4  max-md:mb-1 max-md:mr-8">
          <img
            src="/Accessoiresimages.png"
            className="w-[30vw] object-cover max-md:w-[72vw]"
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
