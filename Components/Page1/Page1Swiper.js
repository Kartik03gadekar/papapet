import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Page1.module.css";
import { Autoplay, Pagination } from "swiper/modules";
const Page1Swiper = ({ imgLink, data }) => {
  return (
    <div className="w-full mt-[15vh] gap-5 h-[30vh] flex items-center justify-center p-2">
      <div className="w-[40vw] bg-red-500 h-full relative rounded-2xl overflow-hidden ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="swiperSlideHome mySwiper border-black"
        >
          {data?.map((i, ind) => (
            <SwiperSlide key={ind}>
              <img
                src={`${imgLink}/${i?.filename}/${i?.mimetype}`}
                className="w-full object-fill h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card h-full w-[10vw] bg-[#00ab7d] text-white rounded-2xl relative overflow-hidden  cursor-pointer">
        <h1 className="font-[gilroy] font-bold text-2xl p-2 leading-6 ease-in-out duration-200 transition-all">
          VET DOCTORS
        </h1>
        <h4 className="font-[gilroy] font-semibold text-base p-2 text-white opacity-70 leading-tight ease-in-out duration-200 transition-all">
          Book <br /> Now
        </h4>
        <img
          src="/doctor_square_hotkey.webp"
          className="h-[80%] w-full object-cover absolute bottom-0 right-0 ease-in-out duration-200 transition-all"
          alt=""
        />
      </div>
      <div className="h-full w-[10vw] bg-green-500 rounded-2xl"></div>
      <div className="h-full w-[10vw] bg-green-500 rounded-2xl"></div>
      <div className="h-full w-[10vw] bg-green-500 rounded-2xl"></div>
    </div>
  );
};

export default Page1Swiper;
