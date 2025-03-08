import { Input, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");

  return (
    <div className="  max-md:flex max-md:flex-col max-md:items-center max-md:justify-start max-md:pt-[26vw] w-full h-screen overflow-hidden flex flex-col items-start px-[8vw] justify-center relative gap-4 max-md:h-[100vh] max-md:pb-0">
      {/* Content Wrapper */}
      <div className=" max-md:absolute  max-md:top-[12%]  max-md:left-[5%]  max-md:z-10 pt-2">
        <h1 className="  text-black text-7xl font-bold leading-tight max-md:text-4xl  max-md:mb-3 ">
          Making Pet's Life <span className="text-[#0D9899]">Better</span>
          <br className="max-md:hidden" /> Together
        </h1>
        <p className="w-[36%] text-lg max-md:w-full  max-md:px-4 pt-2">
          Discover the perfect pet heating solutions to keep your beloved
          companions cozy and content all year round.
        </p>
        <div className="flex items-center gap-4  max-md:mt-[0.2vw] ">
          <button className="linear rounded-full font-semibold text-lg ">
            Our services{" "}
            <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
          </button>
          <Link href={"/"} className="max-md:hidden border-b-2 font-semibold border-black">
            Schedule a call
          </Link>
        </div>
      </div>

      {/* Background Circle */}
      <div className="w-[45vw] h-[45vw] rounded-full max-md:rounded-full absolute -bottom-[20%] max-md:-bottom-[15%] -right-[5%] max-md:-left-[25%] bg-[#0D9899] max-md:w-[150vw] max-md:h-[150vw] z-0">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%] object-contain max-md:-top-[25%] max-md:right-[17%] max-md:h-[110%]"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
