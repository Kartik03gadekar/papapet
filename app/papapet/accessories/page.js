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
    <NavPapaPet />
    <div className=" relative">
      <div className=" w-[100%] gap-[20vw] flex items-center justify-between h-screen px-10 py-[20vw]  
      max-md:flex-col max-md:px-5 max-md:gap-[4vw] max-md:h-auto max-md:py-20">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6 w-[60%] text-black  
         max-md:w-full max-md:text-start max-md:pb-[10vw] max-md:pl-[3vw] max-md:pt-[22vw]">
          <h1 className="text-5xl font-bold leading-tight gilroy max-md:text-3xl max-md:pl-0">
            Let Your  <span className="text-[#0D9899]">Pets</span> <br />
          Enjoy Some Play Time<span className="text-[#FFAD22]">Pets</span>
          </h1>
          <p className="text-lg w-[100%] max-md:w-full max-md:text-base max-md:px-0">
            Because your pet deserves more than just a meal—they deserve a
            bowl full of love, care, and premium nutrition every day.
          </p>
          <div className="flex items-center gap-4 max-md:w-full max-md:justify-start">
            <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-4 max-md:py-1">
              Explore Now{" "}
              <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
            </button>
            
          </div>
        </div>

        {/* Right Content (Dog Image) */}
        <div className="w-[40%] flex justify-end max-md:w-full max-md:justify-center max-md:mt-4 max-md:mr-8">
          <img
            src="/Accessoiresimages.png"
            className="w-[30vw] object-cover max-md:w-[80vw]"
            alt="Dog"
          />
        </div>
      </div>

        
    </div>
    <Types/>
    <AccessoiresProduct/>
    <Footer />
  </>
  )
}

export default page
