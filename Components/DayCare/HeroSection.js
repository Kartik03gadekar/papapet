"use client"
import React from 'react'

const HeroSection = () => {
    return (
      <div className="   relative w-full flex items-center justify-between h-screen px-1  overflow-hidden 
      max-md:flex-col max-md:px-5  max-md:h-fit  ">
      
      {/* Left Content */}
      <div className=" px-[4vw] flex flex-col items-start justify-start gap-1  mt-[15vw] w-[70%] h-full text-black   
        max-md:w-full max-md:text-start  max-md:pl-[2vw] max-md:pt-[8vw]    ">

      {/* Title */}
      <h1 className="text-5xl font-bold leading-tight gilroy mt-1 max-md:text-[7vw] ">
        Discover the Best <span className="text-[#0D9899]">Daycare</span>   <br /> for Your Pet’s Care & Play!
      </h1>
    
      {/* Description */}
      <p className="text-lg w-[80%] pt-4 max-md:w-full max-md:text-base">
        Discover the Best Daycare for Your Pet’s Care & Play! 
A safe and engaging space where pets receive attention, playtime, and the care they deserve.
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
    
          <div className="   w-[30%]  flex justify-start items-start max-md:w-full max-md:justify-center mt-[10vw]  max-md:mr-8">
    
            <img src="/daycareheroimage.png" className=" relative  z-10 w-[30vw] object-cover max-md:w-[80vw]" alt="Dog" />
    
          </div>
        </div>
      );
}

export default HeroSection
