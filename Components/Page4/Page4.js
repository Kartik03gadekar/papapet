"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination,Navigation } from "swiper/modules";
import style from  "./Page4.module.css"

const Page4 = () => {
  
  const brands = [
    {  img: "/walkingPet.png" },
    {  img: "/doctorPapaper.png" },
    {  img: "/dayCare.png" },
    {  img: "/grooming.png" },
    {  img: "/walkingPet.png" },
    {  img: "/doctorPapaper.png" },
    {  img: "/dayCare.png" },
    {  img: "/grooming.png" },
  ];

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      {/* Title */}
      <div className="text-center mt-12">
        <div className="flex items-end justify-center gap-5 ">
          <h1 className="text-3xl font-bold">
            Featured <span className="text-[#0D9899]">Brands</span>
          </h1>
          <img src="/serviceDog.png" className="max-md:h-12 h-16" alt="Service Dog" />
        </div>
        <p className="text-lg max-md:text-base mt-2">
          Experience the best of the best. Shop our featured brands for quality and style.
        </p>
      </div>

      {/* Full-Width Swiper Brand Section */}
      <div className="w-full h-40 mt-10 flex items-center justify-center">
        <Swiper
          slidesPerView={2}
          spaceBetween={40}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination,Navigation]}
          className={` ${style.swiper} `} // Ensures full width
        >
          {brands.map((brand, index) => (
            <SwiperSlide   key={index} className={`  flex flex-col items-center justify-center gap-30
            ${style.swiper} `} >
              <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-yellow-500 rounded-full flex items-center justify-center">
                <img
                  src={brand.img}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              
              </div>
            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>
    </div>
  );
};

export default Page4;
