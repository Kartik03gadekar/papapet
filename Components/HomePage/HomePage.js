"use client";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");

  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 20, // optional offset for padding
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-md:flex max-md:flex-col max-md:items-center max-md:justify-between max-md:pt-[2vw] w-full 
      overflow-hidden flex items-center justify-between min-h-screen px-10 py-[8vw] pl-[3vw] pt-[6vw] gap-4 max-md:gap-0 max-md:overflow-hidden
      max-md:min-h-screen max-md:pb-0 z-10">

      {/* Left Side Content */}
      <div className="max-md:mb-4 w-1/2 text-black max-md:text-start max-md:pb-[8vw] max-md:pl-[2vw] max-md:pt-[5vw] 
        flex flex-col gap-4 max-md:gap-2 max-md:w-full max-md:px-4 max-w-[700px]">
        
        <h1 className="text-5xl font-bold leading-tight text-[gilroy] max-md:text-[7vw]">
          Making Pet's Life 
          <br className="max-md:hidden" /> <span className="text-[#0D9899]">Better</span> Together
        </h1>

     <p className="text-[4vw] leading-snug text-gray-600 max-w-[600px] w-full md:text-lg max-md:leading-relaxed md:pt-4 md:text-gray-700">
  Premium dog food, veterinary care, pet grooming, accessories, pet walking & daycare.
  Expert-approved pet essentials for a happy, healthy pet!
</p>


        <div className="flex items-center gap-4 pt-[1.7vw] max-md:mt-[0.2vw] max-md:mb-2">
          <button
            onClick={scrollToServices}
            className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]"
          >
            Our services{" "}
            <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
          </button>

          
        </div>
      </div>

      {/* Background Circle & Dog Image */}
      <div className="w-[46vw] h-[46vw] rounded-full absolute -bottom-[20%] max-md:-bottom-[13%] 
        -right-[5%] max-md:-left-[25%] bg-[#0D9899] max-md:w-[156vw] max-md:h-[156vw] z-[-1]">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%] object-contain max-md:-top-[37%] max-md:right-[17%] max-md:h-[120%]"
          alt="Black Dog"
        />
      </div>
    </div>
  );
};

export default HomePage;
