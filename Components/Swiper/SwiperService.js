"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Link from 'next/link'
import styles from "./Service.module.css";
import { Autoplay } from "swiper/modules";

// import { Scrollbar } from 'swiper/modules';
const SwiperService = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(data);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        scrollbar={{
          hide: true,
          dragSize: 200, 
        }}

        modules={[Autoplay]}
        className={styles.swiper2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {data?.map((dets, index) => (
          <SwiperSlide key={index} className={styles.swiperSlideCourse}>
           <Link href={`${dets?.link}`} className="h-full w-full">
           <div className="w-full cursor-pointer h-full flex items-center gap-2 flex-col  relative overflow-hidden shadow-md  shadow-gray-200 rounded-xl">
              <div className="w-full h-[60%] bg-gray-500">
              <img src={dets?.img} className="h-full w-full object-cover" alt="" />

              </div>
              <h1 className="font-bold font-[gilroy] text-2xl">{dets?.name}</h1>
            </div>
           </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperService;
