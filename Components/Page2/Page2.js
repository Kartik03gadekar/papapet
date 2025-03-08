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

import style from "./Page2.module.css";

// import required modules
import { Pagination } from "swiper/modules";

const Page2 = () => {
  const data = [
    {
      name: "Food ",
      img: "/FoodnAcces.png",
      link: "/papapet/food",
      color: "bg-orange-200" 
    },
    {
      name: "Accessories",
      img: "/FoodnAcces.png",
      link: "/papapet/food",
      color: "bg-gray-200" 
    },
    {
      name: "Veteniary Doctor",
      img: "/doctorPapaper.png",
      color: "bg-green-200" 
    },
    {
      name: "Pet Walking",
      img: "/walkingPet.png",
    color: "bg-red-200"
    },

    {
      name: "Pet DayCare",
      img: "/dayCare.png",
      color: "bg-lime-200" 
    },

    {
      name: "Pet Boarding",
      img: "/Boarding.png",
      color: "bg-orange-300"
    },
    {
      name: "Pet Grooming",
      img: "/grooming.png",
      color: "bg-purple-200" 
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center max-md:items-start justify-center py-[10vh]  
    flex-col gap-16 max-md:h-fit bg-white max-md:py-0  max-md:justify-start max-md:mt-[5vw] mb-[5vw]">
      {/* <SwiperService data={cardData}/> */}
      <div className="flex flex-col items-center justify-center max-md:flex max-md:items-center max-md:justify-center  ">
        <div className="flex items-end justify-center gap-5 max-md:flex max-md:items-center max-md:justify-center max-md:ml-[18vw] ">
          <h1 className="text-5xl text-[gilroy] font-semibold pb-5  max-md:text-4xl">
            Our   <span  className="text-[#0D9899]" >Services </span>
          </h1>
          <img src="/serviceDog.png" className="max-md:h-[15vw] " alt="" />
        </div>

        <p className="text-center max-md:hidden">
          Discover the perfect pet heating solutions to keep your beloved <br />
          companions cozy and content all year round.
        </p>
      </div>
      <div className="w-full md:hidden h-[50vh] bg-transparent max-md:hidden">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {data?.map((i, index) => (
            <SwiperSlide
              // className="flex items-center justify-center"
              className={style.swiperSlide}
            >
              <Link href={`${i.link}`}>
                <div className="service cursor-pointer min-h-[24vw] w-[20vw] relative gap-2 p-5 py-8 rounded-lg items-center justify-between flex flex-col bg-white text-black border-2 shrink-0 hover:bg-[#F07905] hover:text-white duration-300 ease-in-out max-md:w-[60vw] max-md:py-0">
                  <img
                    className="h-[12vw] W-[12vw] left-1/2 -translate-x-1/2 object-contain absolute -top-10 max-md:h-1/2 w-4/5"
                    src={i?.img}
                    alt=""
                  />
                  <div className="h-32 max-md:h-16 w-32 shrink-0 bg-transparent rounded-full "></div>
                  <h1 className="font-semibold text-lg">{i?.name}</h1>
                  <p className="text-center text-[.9vw] max-md:text-[1.5vw]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Itaque excepturi delectus reiciendis consequuntur ducimus
                    dicta.
                  </p>
                  <button className="bg-white border-[1px] border-black text-black px-8 w-[80%] font-semibold rounded-md p-2 max-md:text-sm">
                    Get Service
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden max-md:w-screen max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-6">
  {data.map((i, index) => (
    <div
      key={index}
      className={`max-md:w-[40%] max-md:h-[22vh] max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:rounded-lg max-md:shadow-lg ${i.color} max-md:p-4 max-md:min-w-[180px]`}
    >
      <h1 className="max-md:font-semibold max-md:text-lg max-md:ml-4 max-md:pb-2 max-md:pr-[5vw]">{i.name}</h1>
      <img src={i.img} className=" max-md:w-auto max-md:h-[12vh]" alt={i.name} />
    </div>
  ))}
</div>

      <div className="w-full max-md:hidden flex flex-wrap gap-10 items-center justify-center gap-y-20 max-md:grid-cols-1 place-content-center place-items-center">
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

     <div className="w-screen flex  items-center justify-center gap-40 shrink-0 flex-wrap  ">
     {data?.map((i, index) => (
          <Link href={`${i.link}`}>
            <div className="service  cursor-pointer h-[14vw] w-[14vw]  items-center relative gap-2  p-5 py-4 rounded-full tems-center justify-center flex flex-col bg-white text-black border-2 shrink-0 hover:bg-[#0D9899] hover:text-white duration-300 ease-in-out max-md:w-[60vw]">
              <img
                className="h-[8vw] W-[10vw] left-1/2 -translate-x-1/2 object-contain absolute -top-5 max-md:h-1/2 w-4/5"
                src={i?.img}
                alt=""
              />
              <div className="h-32 max-md:h-16 w-32 shrink-0 bg-transparent rounded-full "></div>
              <h1 className="font-semibold text-lg">{i?.name}</h1>
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
    </div>
  );
};

export default Page2;
