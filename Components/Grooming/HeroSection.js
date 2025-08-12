"use client"
import React from 'react'

const HeroSection = () => {
    return (
         <div className=" relative   max-md:flex max-md:flex-col max-md:items-center max-md:justify-start 
         max-md:pt-[2vw] w-full overflow-hidden flex items-center justify-between h-screen px-8 py-[6vw] pl-[3vw] 
           pt-[5vw]  max-md:gap-1   max-md:h-[100vh] max-md:pb-0 ">
    
      {/* Left Content */}
      <div className="  max-md:mb-2 w-1/2 text-black  max-md:text-start max-md:pb-[2vw] max-md:pl-[2vw] max-md:pt-[5.5vw] 
    flex flex-col gap-4 max-md:gap-1  max-md:w-full max-md:px-4">
    
      {/* Title */}
  <h1 className="text-5xl font-bold leading-tight text-[gilroy] max-md:text-[7vw] max-md:mb-1">
        Pamper Your Pet with <br />
Top-Rated  <span className="text-[#0D9899]">Grooming</span> Services!
      </h1>
    
      {/* Description */}
    <p className="w-[80%] text-lg pt-4 max-md:pt-1 max-md:text-[3.8vw] max-md:text-gray-500 max-md:font-[400]">
      Premium care to keep your pet looking and feeling   their best with gentle hands and expert touch.
      </p>
    
      {/* Button */}
      <div className="flex items-center gap-4 pt-[1.7vw] max-md:mt-[0.2vw]">
    <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]">
          Explore Now <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
        </button>
      </div>
    
    </div>
    
          {/* Right Content (Dog Image) */}
    <div className="absolute -right-[70px] -bottom-[155px] bg-[#FDB625] w-[35vw] h-[35vw] rounded-full " ></div>
    
    <div className="   max-md:w-screen  max-md:flex max-md:justify-start max-md:items-start ">
    <img 
        src="/groomingmainimage.png" 
        className="relative z-10 w-[25vw] object-cover max-md:ml-[37vw]
        max-md:w-[60vw] " 
        alt="Dog" 
    />
</div>
        </div>
      );
}

export default HeroSection
