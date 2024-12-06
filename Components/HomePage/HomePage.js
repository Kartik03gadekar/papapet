import { Input, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");
  return (
    <div className="w-full  h-screen overflow-hidden flex flex-col items-start px-[8vw] justify-center bg-white relative gap-4">
      <h1 className="text-black text-7xl font-bold leading-tight">
        Making Pet Life <span className="text-[#0D9899]">Better</span>
        <br /> Together
      </h1>
      <p className="w-[36%] text-lg">
        Discover the perfect pet heating solutions to keep your beloved
        companions cozy and content all year round.
      </p>
      <div className="flex items-center  gap-4 ">
        <button className="linear rounded-full font-semibold text-lg">
          Our services <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
        </button>
        <Link href={"/"} className="border-b-2 font-semibold border-black">
        Schedule a call
        </Link>
      </div>
      <div className="w-[45vw] h-[45vw] rounded-full absolute -bottom-[20%] -right-[5%] bg-[#0D9899]">
        <img
          src="/blackDog.png"
          className="absolute -top-[40%] right-16 h-[120%] object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
