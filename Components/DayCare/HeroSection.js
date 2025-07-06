"use client"
import React from 'react'

const HeroSection = () => {
    return (
     <div className="relative   max-md:flex max-md:flex-col max-md:items-center max-md:justify-start max-md:pt-[2vw] w-full 
    overflow-hidden flex items-center justify-between h-screen px-6 py-[4vw] pl-[3vw]   pt-[6vw]    max-md:h-[100vh] max-md:pb-0 ">
     
      {/* Left Content */}
     <div className=" w-1/2 text-black  max-md:text-start max-md:pb-[1vw] max-md:pl-[2vw] max-md:pt-[5.5vw] 
    flex flex-col gap-4 max-md:gap-1  max-md:w-full  max-md:px-4">

      {/* Title */}
       <h1 className="text-5xl font-bold leading-tight text-[gilroy] max-md:text-[7vw] max-md:mb-1">
        Discover the Best <span className="text-[#0D9899]">Daycare</span>   <br /> for Your Pet’s Care & Play!
      </h1>
    
      {/* Description */}
      <p className="w-[80%] text-lg pt-4 max-md:pt-1 max-md:text-[3.8vw] max-md:text-gray-500 max-md:font-[400]">
        Discover the Best Daycare for Your Pet’s Care & Play!. 
A safe and engaging space where pets receive attention, playtime, and the care they deserve.
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
    
          <div className=" w-[40%]  flex justify-start items-start max-md:w-full max-md:justify-center mt-[8vw] max-md:mt-0 max-md:mr-18">
    
            <img src="/daycareheroimage.png" className=" relative  z-10 w-[40vw] object-cover max-md:w-[80vw]" alt="Dog" />
    
          </div>
        </div>
      );
}

export default HeroSection
