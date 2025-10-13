import React from "react";
import { useRouter } from "next/navigation";

const FloatingWindow = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/papapet/doctor/healthreport");
  };

  return (
    <div
     
      className="bg-gradient-to-r from-[#FEBC28] to-white cursor-pointer"
    >
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 gap-10">
        <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-left">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#1E1E1E]">
            Generate your pet's health report with{" "}
            <span className="text-[#0D9899]">PaPaPet AI</span> Health Report
            Generator
          </h1>

          <button  onClick={handleClick} className="bg-[#0D9899] hover:bg-[#0b7c7d] transition-all rounded-full px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl text-white font-semibold shadow-md">
            Generate Now...
          </button>
        </div>

        <img
          className="w-2/3 sm:w-1/2 md:w-[30%] max-w-sm"
          src="/healthreport/homedoctor.png"
          alt="PaPaPet Health Report"
        />
      </div>
    </div>
  );
};

export default FloatingWindow;
