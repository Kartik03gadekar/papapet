"use client"
import React from 'react'

const HeroSection = () => {
    return (
        <div className="   relative w-full flex items-center justify-center  h-screen px-10  overflow-hidden 
          max-md:flex-col max-md:px-2  max-md:h-fit  ">
          
          {/* Left Content */}
          <div className="  flex flex-col items-start justify-start gap-3  mt-[15vw] w-[70%] h-full text-black   
            max-md:w-full max-md:text-start  max-md:pl-[2vw] max-md:pt-[5vw]   max-md:gap-0  ">
    
      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight gilroy mt-3 max-md:text-[7vw] ">
        Pamper Your Pet with <br />
Top-Rated  <span className="text-[#0D9899]">Grooming</span> Services!
      </h1>
    
      {/* Description */}
      <p className="text-lg w-[80%] pt-5 max-md:w-full max-md:text-base">
      Premium care to keep your pet looking and feeling   their best with gentle hands and expert touch.
      </p>
    
      {/* Button */}
      <div className="flex items-center gap-4 pt-4">
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
        className="relative z-10 w-[25vw] object-cover max-md:ml-[16vw]
        max-md:w-[80vw] " 
        alt="Dog" 
    />
</div>
        </div>
      );
}

export default HeroSection
