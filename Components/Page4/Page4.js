"use client";
import { cardData, eyeData, ivfData } from "@/db/Card";
import { colors } from "@mui/material";
import Link from "next/link";
import React from "react";
import SwiperService from "../Swiper/SwiperService";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
const Page4 = () => {
  const data = [
    {
      name: "Pet Walking",
      img: "/walkingPet.png",
    },
    {
      name: "Veteniary Doctor",
      img: "/doctorPapaper.png",
    },
    {
      name: "Pet DayCare",
      img: "/dayCare.png",
    },
    {
      name: "Pet DayCare",
      img: "/dayCare.png",
    },
  ];

  return (
    <div className="h-fit w-full flex items-center justify-center py-[10vh] flex-col gap-16 max-md:py-[3vh] max-md:h-[50vh] bg-white">
      {/* <SwiperService data={cardData}/> */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-end justify-center gap-5">
          <h1 className="text-5xl text-[gilroy] font-semibold pb-5">
            Featured Brands
          </h1>
          <img src="/serviceDog.png" alt="" />
        </div>

        <p className="text-center ">
          Discover the perfect pet heating solutions to keep your <br /> beloved
          companions cozy and content all year round.
        </p>
      </div>

      <div className="max-md:hidden flex flex-wrap justify-around gap-10 items-center  gap-y-20 max-md:grid-cols-1 place-content-center place-items-center w-[80%]">
        {/* <div className="min-h-[24vw] w-[20vw] gap-2 text-white p-5 py-8 rounded-lg items-center justify-between flex flex-col bg-[#F07905] shrink-0">
          <div className="h-32 w-32 shrink-0 bg-white rounded-full"></div>
          <h1 className="font-semibold text-lg">Health & Wellness</h1>
          <p className="text-center text-[.9vw]">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque excepturi delectus reiciendis consequuntur ducimus dicta.
          </p>
          <button className="w-[80%] bg-white text-black px-8 font-semibold rounded-md p-2">
            Get Service
          </button>
          </div>    */}

        {data?.map((i, index) => (
          <Link href={`${i.link}`}>
            <div className="service  cursor-pointer h-[8Vw] w-[16vw] bg-[#D9D9D9]  items-center relative gap-2 p-5 py-8 rounded-full tems-center justify-between flex flex-col text-black border-2 shrink-0 hover:bg-[#0D9899] hover:text-white duration-300 ease-in-out max-md:w-[60vw]">
              {/* <img
                className="h-[12vw] W-[12vw] left-1/2 -translate-x-1/2 object-contain absolute -top-10 max-md:h-1/2 w-4/5"
                src={i?.img}
                alt=""
              />
              <div className="h-32 max-md:h-16 w-32 shrink-0 bg-transparent rounded-full "></div>
              <h1 className="font-semibold text-lg">{i?.name}</h1> */}
              {/* <p className="text-center text-[.9vw] max-md:text-[1.5vw]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
                excepturi delectus reiciendis consequuntur ducimus dicta.
              </p>
              <button className="bg-white border-[1px] border-black text-black px-8 w-[80%] font-semibold rounded-md p-2 max-md:text-sm">
                Get Service
              </button> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page4;
