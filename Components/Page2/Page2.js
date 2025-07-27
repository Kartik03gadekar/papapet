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
      link: "/papapet/accessories",
      color: "bg-gray-200" 
    },
    {
      name: "Veteniary Doctor",
      img: "/doctorPapaper.png",
      link: "/papapet/doctor",
      color: "bg-green-200" 
    },
    {
      name: "Pet Walking",
      link: "/papapet/walking",
      img: "/walkingPet.png",
    color: "bg-red-200" 
    },

    {
      name: "Pet DayCare",
      link: "/papapet/daycare",
      img: "/dayCare.png",
      color: "bg-lime-200" 
    },

    {
      name: "Pet Boarding",
      link: "/papapet/boarding",
      img: "/Boarding.png",
      color: "bg-orange-300"
    },
    {
      name: "Pet Grooming",
      link: "/papapet/grooming",
      img: "/grooming.png",
      color: "bg-purple-200" 
    },
  ];
  const dataTwo = [
    {
     
      img: "/ServiecesAccosaries.png",
      link: "/papapet/food"
     
    },
    {
     
      img: "/ServiecesAccosaries.png",
      link: "/papapet/accessories"
     
    },
    {
     
      img: "/ServiecesDoctor.png",
      link: "/papapet/doctor"
    
    },
    {
    
      link: "/papapet/walking",
      img: "/ServiecesWalking.png"
   
    },

    {
     
      link: "/papapet/daycare",
      img: "/ServiecesDayCare.png"
    
    },

    {
     
      link: "/papapet/boarding",
      img: "/ServiecesBoarding.png"
  
    },
    {
      
      link: "/papapet/grooming",
      img: "/ServiecesGromming.png"
     
    }
  ];

  return (
   <section id="services">
     <div className=" min-h-screen w-full flex items-center max-md:items-start justify-center py-[8vh]  
    flex-col gap-20 max-md:gap-8  max-md:h-fit bg-white max-md:py-0  max-md:justify-start max-md:mt-[5vw] mb-[3vw]">
      {/* <SwiperService data={cardData}/> */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center gap-5 w-full mt-20">
          <div className="flex items-center justify-center gap-5 mx-auto">
            <h1 className="text-5xl text-[gilroy] font-semibold max-md:text-4xl text-center">
              Our <span className="text-[#0D9899]">Services </span>
            </h1>
            <img src="/serviceDog.png" className="max-md:h-[15vw]" alt="" />
          </div>
        </div>
        <p className="text-center text-black max-md:hidden">
          Discover the perfect pet heating solutions to keep your beloved <br />
          companions cozy and content all year round.
        </p>
      </div>
    

    {/*currently using */}
     <div className="w-full flex flex-wrap md:hidden gap-4 px-0 py-0">
      {dataTwo.map((i, index) => (
        <Link
          key={index}
          href={i.link}
          className={`
            flex-[1_1_100%] min-w-[100%] max-w-full
            sm:flex-[1_1_48%] sm:min-w-[48%] sm:max-w-[48%]
          `}
        >
          <div className="flex items-center justify-center rounded-lg h-[24vh] w-full p-3 m-0 overflow-hidden">
            <div className="w-full h-full rounded-lg">
              <img
                src={i.img}
                className="w-full h-full object-contain"
                alt={i.name}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
      <div className="w-full max-md:hidden flex flex-wrap gap-10 items-center justify-center gap-y-20 max-md:grid-cols-1 
      place-content-center place-items-center">


     <div className="w-screen flex items-center justify-center gap-40 shrink-0 flex-wrap">
       {data?.map((i, index) => (
         <Link href={`${i.link}`} key={index}>
           <div className="service cursor-pointer h-[15vw] w-[15vw] items-center relative gap-1 rounded-full justify-center flex flex-col 
             text-black border-2 shrink-0 hover:bg-[#0D9899] hover:text-white duration-300 ease-in-out 
             max-lg:h-[22vw] max-lg:w-[22vw] max-md:w-[60vw] max-md:h-[32vw]">
             <img
               className="h-[7vw] w-[7vw] object-contain absolute -top-2 max-lg:h-[10vw] max-lg:w-[10vw] max-md:h-[16vw] max-md:w-[40vw] left-1/2 -translate-x-1/2"
               src={i?.img}
               alt=""
             />
             <div className="h-32 max-lg:h-40 max-md:h-16 w-full shrink-0 bg-transparent rounded-full"></div>
             <h1
               className="
                 font-semibold 
                 text-[1.2vw] 
                 pb-[4vw] 
                 max-lg:text-[2vw] 
                 max-lg:pb-[6vw] 
                 max-md:text-[4vw] 
                 max-md:pb-[5vw] 
                 text-center
               "
             >
               {i?.name}
             </h1>
           </div>
         </Link>
       ))}
     </div>
      </div>
    </div>
   </section>
  );
};

export default Page2;
