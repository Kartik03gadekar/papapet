"use client"
import React from 'react'

const HeroSection = () => {
    return (
        <div className=" relative w-full flex items-center justify-between h-screen px-10  overflow-hidden 
          max-md:flex-col max-md:px-5 max-md:gap-[2vw] max-md:h-auto max-md:pt-4">
          
          {/* Left Content */}
          <div className="flex flex-col items-start justify-start gap-4  mt-[15vw] w-[70%] h-full text-black  
            max-md:w-full max-md:text-start max-md:pb-[4vw] max-md:pl-[2vw] max-md:pt-[18vw]">
    
      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight gilroy mt-4 max-md:text-3xl">
        
        Safe & Cozy <span className="text-[#0D9899]">Boarding</span>  for <br /> Your Pet While You’re Away!
      </h1>
    
      {/* Description */}
      <p className="text-lg w-[80%] pt-5 max-md:w-full max-md:text-base">
      Comfortable overnight stays with attentive caregivers, <br /> ensuring a stress-free experience for your pet.
      </p>
    
      {/* Button */}
      <div className="flex items-center gap-4 pt-4">
        <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]">
          Explore Now <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
        </button>
      </div>
    
    </div>
    
          {/* Right Content (Dog Image) */}
    <div className="absolute -right-[70px] -bottom-[155px] bg-[#0D9899] w-[35vw] h-[35vw] rounded-full " ></div>
    
          <div className="   w-[40%]  flex justify-start items-start max-md:w-full max-md:justify-center mt-[5vw] max-md:mt-4 max-md:mr-8">
    
            <img src="/boardingmainimage.png" className=" relative ml-[4vw]  z-10 w-[40vw] object-cover max-md:w-[80vw]" alt="Dog" />
    
          </div>
        </div>
      );
}

export default HeroSection
