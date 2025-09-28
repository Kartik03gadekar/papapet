"use client";
import { useState, useEffect } from "react";
import { cardData, eyeData, ivfData } from "@/db/Card";
import { colors } from "@mui/material";
import Link from "next/link";
import React from "react";
import SwiperService from "../Swiper/SwiperService";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import style from "./Page2.module.css";

// import required modules
import { Pagination } from "swiper/modules";

const Page2 = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const data = [
    {
      name: "Food & Products",
      img: "/FoodnAcces.png",
      link: "/papapet/food",
      color: "bg-orange-200",
    },
    {
      name: "Veteniary Doctor",
      img: "/doctorPapaper.png",
      link: "/papapet/doctor",
      color: "bg-green-200",
    },
    {
      name: "Pet Walking",
      link: "/papapet/walking",
      img: "/walkingPet.png",
      color: "bg-red-200",
    },

    {
      name: "Pet DayCare",
      link: "/papapet/daycare",
      img: "/dayCare.png",
      color: "bg-lime-200",
    },

    {
      name: "Pet Boarding",
      link: "/papapet/boarding",
      img: "/Boarding.png",
      color: "bg-orange-300",
    },
    {
      name: "Pet Grooming",
      link: "/papapet/grooming",
      img: "/grooming.png",
      color: "bg-purple-200",
    },
  ];
  const dataTwo = [
    {
      img: "/servicesfood.png",
      link: "/papapet/food",
    },
    {
      img: "/ServiecesDoctor.png",
      link: "/papapet/doctor",
    },
    {
      link: "/papapet/walking",
      img: "/ServiecesWalking.png",
    },

    {
      link: "/papapet/daycare",
      img: "/ServiecesDayCare.png",
    },

    {
      link: "/papapet/boarding",
      img: "/ServiecesBoarding.png",
    },
    {
      link: "/papapet/grooming",
      img: "/ServiecesGromming.png",
    },
  ];

  useEffect(() => {
    data.slice(0, 3).forEach((d) => {
      router.prefetch(d.link);
    });
  }, [router]);

  const handleClick = async (index, link) => {
    if (index <= 2) {
      await router.prefetch(link); // make sure it’s cached
      router.push(link);
    } else {
      setShowModal(true);
    }
  };
  return (
    <section id="services">
      <div
        className="min-h-auto w-full flex items-center max-md:items-start justify-center py-[8vh]  
        flex-col gap-20 max-md:gap-8  max-md:h-fit bg-white max-md:py-0  max-md:justify-start max-md:mt-[5vw] mb-[3vw]"
      >
        {/* <SwiperService data={cardData}/> */}
        <div className="w-full flex flex-col items-center justify-center max-md:flex max-md:items-center max-md:justify-center">
          <div className="flex items-end justify-center gap-5 max-md:flex max-md:items-center max-md:justify-center">
            <h1 className="text-5xl text-[gilroy] font-semibold max-md:text-4xl">
              Our <span className="text-[#0D9899]">Services </span>
            </h1>
            <img src="/serviceDog.png" className="max-md:h-[15vw]" alt="" />
          </div>

          <p className="text-center max-md:hidden">
            Discover the perfect pet heating solutions to keep your beloved{" "}
            <br />
            companions cozy and content all year round.
          </p>
        </div>

        <div className="hidden max-md:flex max-md:justify-center max-md:items-center max-md:w-screen max-md:px-4">
          <div className="grid grid-cols-2 gap-1">
            {dataTwo.map((i, index) => (
              <div
                onClick={() => handleClick(index, i.link)}
                key={index}
                className="w-full cursor-pointer"
                onTouchStart={() => router.prefetch(i.link)}
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={i.img}
                    width={450}
                    height={300}
                    className="w-auto object-contain"
                    alt={i.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full max-md:hidden flex flex-wrap gap-10 items-center justify-center gap-y-20 max-md:grid-cols-1 
        place-content-center place-items-center"
        >
          <div className="w-screen flex items-center justify-center gap-40 shrink-0 flex-wrap px-10">
            {data?.map((i, index) => (
              <div
                onClick={() => handleClick(index, i.link)}
                key={index}
                href={i.link}
                onMouseEnter={() => router.prefetch(i.link)}
              >
                <div
                  className="service cursor-pointer h-[15vw] w-[15vw] items-center relative gap-1 rounded-full justify-center flex flex-col 
                  text-black border-2 shrink-0 hover:bg-[#0D9899] hover:text-white duration-300 ease-in-out max-md:w-[60vw]"
                >
                  <img
                    className="h-[7vw] W-[7vw] object-contain absolute -top-2 max-md:h-1/2 w-4/5 left-1/2 -translate-x-1/2"
                    src={i?.img}
                    alt=""
                  />

                  <div className="h-32 max-md:h-16 w-full shrink-0 bg-transparent rounded-full"></div>
                  <h1 className="font-semibold text-[1.2vw] pb-[4vw] max-md:text-[1vw] max-lg:pb-[6vw] max-lg:text-[1vw] max-md:pb-[5vw]">
                    {i?.name}
                  </h1>
                  {/* <p className="text-center text-[.9vw] max-md:text-[1.5vw]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
                    excepturi delectus reiciendis consequuntur ducimus dicta.
                  </p>
                  <button className="bg-white border-[1px] border-black text-black px-8 w-[80%] font-semibold rounded-md p-2 max-md:text-sm">
                    Get Service
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl w-[90%] max-w-md">
              <h2 className="text-2xl font-bold mb-4">🚧 Coming Soon 🚧</h2>
              <p className="text-gray-600 mb-6">
                <b>
                  {" "}
                  Woof! Our paws are still busy building this service. Stay
                  tuned!”
                </b>
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-[#0D9899] text-white rounded-lg hover:bg-[#0a7a7b] transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Page2;
