"use client";
import React from "react";

const HeroSection = () => {

  return (
     <div className=" relative   max-md:flex max-md:flex-col max-md:items-center max-md:justify-start
      max-md:pt-[2vw] w-full 
    overflow-hidden flex items-center justify-between h-screen px-8 
    py-[6vw] pl-[3vw]   pt-[5vw]  max-md:gap-1   max-md:h-[100vh] max-md:pb-0 ">
    
      
    {/* Left Content */}
   <div className="   max-md:mb-0 w-1/2 text-black  max-md:text-start max-md:pb-[0vw] max-md:pl-[2vw] max-md:pt-[5.5vw] 
    flex flex-col gap-4 max-md:gap-1  max-md:w-full max-md:px-2">
    
  {/* Title */}
  <h1 className="text-5xl font-bold leading-tight text-[gilroy] max-md:text-[7vw] ">
    Find Trusted <span className="text-[#0D9899]"> Pet Walkers </span> Near You for Happy Strolls!
  </h1>

  {/* Description */}
<p className="w-full max-w-[600px] text-gray-600 text-[4vw] pt-2 md:text-lg max-md:leading-relaxed">
  Ensure your pet stays active and happy with experienced professionals <br />
  who provide daily exercise and care.
</p>
  

  {/* Button */}
  <div className="flex items-center gap-4 pt-[1.7vw] ">
    <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]">
      Explore Now <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
    </button>
  </div>

</div>

      {/* Right Content (Dog Image) */}
<div className=" absolute -right-[70px] -bottom-[155px] bg-[#0D9899] w-[35vw] h-[35vw] rounded-full " ></div>

      <div className="  w-[30%]  flex justify-start items-start max-md:w-screen  max-md:flex   max-md:justify-start
       max-md:items-start  max-md:mr-12">

      <img 
    src="/petwalkingheropage.png" 
    className="relative z-10 w-[25vw] object-cover max-md:w-[74vw] max-md:mt-0 max-md:mx-auto" 
    alt="Dog" 
  />
      </div>
    </div>
  );
};

export default HeroSection;
