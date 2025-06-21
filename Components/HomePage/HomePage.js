import { Input, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");

  return (
    <div className="  max-md:flex max-md:flex-col max-md:items-center max-md:justify-start max-md:pt-[10vw] w-full h-screen 
    overflow-hidden flex flex-col items-start px-[2vw] justify-start pt-[8vw] relative gap-4 max-md:gap-2  max-md:h-[100vh] max-md:pb-0 ">
      {/* Content Wrapper */}
      <div className=" max-md:absolute  max-md:top-[5%]  max-md:left-[2%]  max-md:z-10  ">
        <h1 className="  text-black text-7xl font-bold leading-tight max-md:text-[7vw]  max-md:mb-1 max-md:px-4">
          Making Pet's Life <span className="text-[#0D9899]">Better</span>
          <br className="max-md:hidden" /> Together
        </h1>
        <p className="w-[38%] text-lg max-md:w-full  max-md:px-4 pt-4   max-md:pt-1 max-md:text-[3.8vw] max-md:text-gray-500 max-md:font-[400] ">
        Premium dog food, veterinary care, pet grooming, accessories, pet walking & daycare. Expert-approved pet essentials for a happy, healthy pet!
        </p>
        <div className="flex items-center gap-4  max-md:mt-[0.4vw] pt-[2vw]">
        <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-[4vw] max-md:py-[2vw]">
            Our services{" "}
            <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
          </button>
          <Link href={"/"} className="max-md:hidden border-b-2 font-semibold border-black">
            Schedule a call
          </Link>
        </div>
      </div>

      {/* Background Circle */}
      <div className="  w-[46vw] h-[46vw] rounded-full max-md:rounded-full absolute -bottom-[20%] max-md:-bottom-[15%] 
      -right-[5%] max-md:-left-[25%] bg-[#0D9899] max-md:w-[156vw] max-md:h-[156vw] z-0">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%] object-contain max-md:-top-[33%] max-md:right-[17%] max-md:h-[115%]"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
