import { Input, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");

  return (


     <div className="relative   max-md:flex max-md:flex-col max-md:items-center max-md:justify-between max-md:pt-[2vw] w-full 
    overflow-hidden flex items-center justify-between h-screen px-10 py-[8vw] pl-[3vw]   pt-[6vw] gap-4 max-md:gap-1   max-md:h-[100vh] max-md:pb-0 ">
    {/* //  <div className=" overflow-hidden relative flex items-center justify-between h-screen px-10 py-[8vw] pl-[4vw]   */}
    {/* //     max-md:flex-col max-md:px-5 max-md:gap-[0vw] max-md:h-fit max-md:pt-[1vw] pt-[1vw] "> */}
   
    <div className="max-md:mb-2 w-1/2 text-black  max-md:text-start max-md:pb-[8vw] max-md:pl-[2vw] max-md:pt-[5.5vw] 
    flex flex-col gap-4 max-md:gap-2  max-md:w-full max-md:px-4">
  {/* <div className="flex flex-col gap-4 w-[38%] max-md:w-full max-md:px-4"> */}
    <h1 className="text-5xl font-bold leading-tight text-[gilroy] max-md:text-[7vw] max-md:mb-1">
      Making Pet's Life <span className="text-[#0D9899]">Better</span>
      <br className="max-md:hidden" /> Together
    </h1>

    <p className="w-[80%] text-lg pt-4 max-md:pt-1 max-md:text-[3.8vw] max-md:text-gray-500 max-md:font-[400]">
      Premium dog food, veterinary care, pet grooming, accessories, pet walking & daycare.
      Expert-approved pet essentials for a happy, healthy pet!
    </p>

    <div className="flex items-center gap-4 pt-[1.7vw] max-md:mt-[0.2vw]">
      <button
        onClick={() => {
          const section = document.getElementById("services");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]"
      >
        Our services{" "}
        <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
      </button>

      <Link
        href={"/"}
        className="border-b-2 font-semibold border-black max-md:hidden"
      >
        Schedule a call
      </Link>
    {/* </div> */}
  </div>
</div>

      {/* Background Circle */}
      <div className="  w-[46vw] h-[46vw] rounded-full max-md:rounded-full absolute -bottom-[20%] max-md:-bottom-[13%] 
      -right-[5%] max-md:-left-[25%] bg-[#0D9899] max-md:w-[156vw] max-md:h-[156vw] z-0">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%] object-contain max-md:-top-[37%] max-md:right-[17%] max-md:h-[120%]"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
