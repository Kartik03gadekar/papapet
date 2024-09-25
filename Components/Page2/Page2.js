"use client";
import { cardData, eyeData, ivfData } from "@/db/Card";
import { colors } from "@mui/material";
import Link from "next/link";
import React from "react";
import SwiperService from "../Swiper/SwiperService";

const Page2 = () => {
  const data = [
    {
      name:"Pet Walking",
      img:"/walkingPet.png"
    },
    {
      name:"Veteniary Doctor",
      img:"/doctorPapaper.png"
    },
    {
      name:"Pet DayCare",
      img:"/dayCare.png"
    },
    {
      name:"Food & Accessories",
      img:"/FoodnAcces.png",
      link:"/papapet/food"
    },
    {
      name:"Pet Boarding",
      img:"/Boarding.png"
    },
    {
      name:"Pet Grooming",
      img:"/grooming.png"
    },
  ]
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-[10vh] flex-col gap-16 max-md:py-[3vh] bg-[#FEF8EA]">
      {/* <SwiperService data={cardData}/> */}
      <h1 className="text-5xl text-[gilroy] font-semibold">Our Services</h1>
      <div className="w-full flex flex-wrap gap-10 items-center justify-center gap-y-20 max-md:grid max-md:grid-cols-1 place-content-center place-items-center">
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
          {
            data?.map((i,index)=>(
              <Link href={`${i.link}`}>
                  <div className="service cursor-pointer min-h-[24vw] w-[20vw] relative gap-2 p-5 py-8 rounded-lg items-center justify-between flex flex-col bg-white text-black border-2 shrink-0 hover:bg-[#F07905] hover:text-white duration-300 ease-in-out max-md:w-[60vw]">
                <img className="h-[12vw] W-[12vw] left-1/2 -translate-x-1/2 object-contain absolute -top-10 max-md:h-1/2 w-4/5" src={i?.img} alt="" />
              <div className="h-32 max-md:h-16 w-32 shrink-0 bg-transparent rounded-full "></div>
              <h1 className="font-semibold text-lg">{i?.name}</h1>
              <p className="text-center text-[.9vw] max-md:text-[1.5vw]">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque excepturi delectus reiciendis consequuntur ducimus dicta.
              </p>
              <button className="bg-white border-[1px] border-black text-black px-8 w-[80%] font-semibold rounded-md p-2 max-md:text-sm">
                Get Service
              </button>
              </div> 
              </Link>
          
            ))
          }  
            
      </div>
    </div>
  );
};

export default Page2;
