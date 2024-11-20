import { Input, Select } from "antd";
import React, { useState } from "react";

const HomePage = () => {
  const [petType, setpetType] = useState("a");
  return (
    <div className="w-full  h-screen flex items-end px-[8vw] justify-between bg-[#f9bf3c] relative">
      <div className="w-[60%] max-md:w-full h-full flex items-center gap-4 justify-center flex-col">
        <h1 className="text-9xl max-md:text-7xl font-bold italic text-black">
          PaPaPet:
        </h1>
        <h1 className="text-7xl max-md:text-5xl font-extrabold text-[#15141499] text-center">
          Making Pet Life Better <br /> Together{" "}
        </h1>
        <button className="text-4xl max-md:text-3xl py-3 rounded-full p-2 bg-[#FEF9F930] w-full mt-14">
          SAVE UPTO 40% OFF
        </button>
        <img src="/hand.png" className="object-contain absolute" alt="" />
      </div>
      <div className="w-[65%] pr-0.5 bg-[#FEF8EA] grid grid-cols-4 max-md:grid-cols-2 absolute max-md:w-[95%] bottom-0 max-md:bottom-0 max-md:h-[20vh] left-1/2 -translate-x-1/2 h-[14vh] rounded-t-xl overflow-hidden max-md:pb-2">
        <div className="w-full flex items-center justify-center flex-col  gap-4">
          <h1 className="text-sm font-semibold text-[#00000082]">
            Choose Your Pet Type
          </h1>
          <Select
            value={petType}
            onChange={(e) => setpetType(e)}
            className="w-[70%] bg-transparent border-none outline-none"
          >
            <Select.Option disabled value="a" selected>
              Give your Pet Info
            </Select.Option>
            <Select.Option value="Dog">Dog</Select.Option>
            <Select.Option value="Cat">Cat</Select.Option>
            <Select.Option value="Fish">Fish</Select.Option>
          </Select>
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-4">
          <h1 className="text-sm font-semibold text-[#00000082]">
            Choose Date
          </h1>
          <Input className="w-[80%]" type="date" />
        </div>
        <div className="w-full flex items-center justify-center  flex-col gap-4">
          <h1 className="text-sm font-semibold text-[#00000082]">Item Type</h1>
          <Select
            value={petType}
            onChange={(e) => setpetType(e)}
            className="w-[70%] border-none outline-none"
          >
            <Select.Option disabled value="a" selected>
              Give your Pet Info
            </Select.Option>
            <Select.Option value="Dog">Dog</Select.Option>
            <Select.Option value="Cat">Cat</Select.Option>
            <Select.Option value="Fish">Fish</Select.Option>
          </Select>
        </div>
        <div className="w-full max-md:h-fit max-md:rounded-md max-md:mt-auto max-md:py-4 max-md:border-b-2 bg-[#31AABBE8] mt-0.5 rounded-tr-xl flex items-center justify-center text-white font-extrabold text-2xl">
          <h1 className="text-sm font-semibold text-[#00000082]">BOOK NOW</h1>
        </div>
      </div>
      <img
        src="/dogHome.png"
        className="object-contain max-md:hidden h-[85%]"
        alt=""
      />
    </div>
  );
};

export default HomePage;
