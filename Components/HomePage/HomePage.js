import { Input, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");
  return (
    <div className="w-full  h-screen overflow-hidden flex flex-col items-start px-[8vw] justify-center relative gap-4 max-md:h-[70vh] max-md:pb-0">
      <h1 className="text-black text-7xl font-bold leading-tight max-md:text-5xl">
        Making Pet's Life <span className="text-[#0D9899]">Better</span>
        <br className="max-md:hidden" /> Together
      </h1>
      <p className="w-[36%] text-lg max-md:w-full">
        Discover the perfect pet heating solutions to keep your beloved
        companions cozy and content all year round.
      </p>
      <div className="flex items-center  gap-4 ">
        <button className="linear rounded-full font-semibold text-lg">
          Our services{" "}
          <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
        </button>
        <Link href={"/"} className="border-b-2 font-semibold border-black">
          Schedule a call
        </Link>
      </div>
      <div className="w-[45vw] max-md:hidden h-[45vw] rounded-full absolute -bottom-[20%] max-md:-bottom-[5%] -right-[5%] max-md:-right-[10%] bg-[#0D9899] max-md:w-[60vw] max-md:h-[60vw] ">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%]   object-contain max-md:-top-[80%] max-md:right-8 max-md:h-[180%]"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
