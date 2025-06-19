"use client";
import Image from "next/image";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination,Navigation } from "swiper/modules";
import style from  "./Page4.module.css"

const Page4 = () => {
  
  const products = [
    {
      name: "Jiggly Ball",
      description: "Jiggly the bouncy ball that keeps your pet active!",
      image: "/Page4Product1.png",
    },
    {
      name: "Glides",
      description: "Slide effortlessly on different surfaces for endless fun.",
      image: "/Page4Product2.png",
    },
    {
      name: "Toothie",
      description: "A must-have dental toy for healthy teeth and fun chewing.",
      image: "/Page4Product3.png",
    },
    {
      name: "Chewie",
      description: "Choose the squeaky toy for playful fun all day long.",
      image: "/Page4Product4.png",
    },
  ];


  const brands = [
    {  img: "/image1.png" },
    {  img: "/image2.png" },
    {  img: "/image3.png" },
    {  img: "/image4.jpg" },
    {  img: "/image5.png" },
    {  img: "/image1.png" },
    {  img: "/image2.png" },
    {  img: "/image3.png" },
    {  img: "/image4.jpg" },
    {  img: "/image5.png" },
  ];

  return (
 
        <div className=" ">
          <div className="hidden    max-md:w-screen max-md:flex max-md:items-center max-md:justify-center  " >
          <img src={`/6.png`} alt="" />
        </div>
   
    
    <div className="w-full flex flex-col items-center py-10 max-md-py-0 px-4">
      {/* Title */}
      <div className="text-center mt-12">
        <div className="flex items-end justify-center gap-5 ">
          <h1 className="text-4xl font-bold">
            Featured <span className="text-[#0D9899]">Brands</span>
          </h1>
          <img src="/serviceDog.png" className="max-md:h-[15vw] h-16" alt="Service Dog" />
        </div>
        <p className=" max-md:hidden text-lg max-md:text-base mt-2">
          Experience the best of the best. Shop our featured brands for quality and style.
        </p>
      </div>

      {/* Full-Width Swiper Brand Section */}
      <div className="w-screen h-40 mt-10 flex items-center justify-center  ">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation={window.innerWidth > 768}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination,Navigation]}
          className={` ${style.swiper} `} // Ensures full width
        >
          {brands.map((brand, index) => (
            <SwiperSlide   key={index} className={`  flex flex-col items-center justify-center gap-20
            ${style.swiper} `} >
              <div className="w-full flex flex-col items-center justify-center ">
              <div className="w-24 h-24 md:w-30 md:h-30 border-4 border-yellow-500 rounded-full flex items-center justify-center   ">
                <img
                  src={brand.img}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className=" max-md:w-70 max-md:h-70 object-contain  rounded-full "
                />
              </div>
              
              </div>
            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>
    </div>


    <section className=" hidden max-md:flex max-md:w-full max-md:h-fit    max-md:flex-col max-md:items-center max-md:p-6 max-md:bg-white">
      {/* Title */}
    <div className="bg-linear-to-t [#FFFFF]-[#FFDEBA]  max-md:w-full ">
     <div className="flex items-end justify-center gap-5 ">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center  gap-2">
        Featured <span className="text-teal-500">Products</span>
        <Image src="/serviceDog.png" alt="Dog" width={40} height={40} />
      </h2>
    </div>

      {/* Products Grid */}
      <div className="grid max-md:grid-cols-2 grid-cols-4 gap-5 mt-6 w-full max-w-6xl h-fit    ">
        {products.map((product, index) => (
          <div
            key={index}
            className=" h-[60vw] w-[45vw] px-4 py-2 shadow-md rounded-lg  bg-gradient-to-b from-[#FBFEFD] to-[#DCF8F0] "
          >
            <h6 className="text-slg font-[500] ">PaPaPet</h6>
            <h3 className="text-xl font-[700] ">{product.name}</h3>
            {/* <p className="text-sm text-gray-600 font-[400] mb-[4] leading-[1.1] ">{product.description}</p> */}
            <img
              src={product.image}
              alt={product.name}
              
              className=" mx-auto max-md:h-[40vw] "
            />
            
          </div>
        ))}
      </div>

    </div>

      {/* Features Section - Visible on Mobile Only */}
      <div className=" max-md:flex max-md:w-screen   max-md:gap-2 max-md:bg-teal-100 py-4  px-2  max-md:items-center  justify-center  max-md:mt-[4vw]  ">
        <div className="max-md:justify-center tween  max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[20vw]
         max-md:bg-white  max-md:rounded-lg">
          <img src="/Page41.png" alt="Products" className="w-[7vw] h-[10vw] mx-2 "  />
          <p className="font-semibold">100+  <span className="font-[400]  ">Products</span></p>
        </div>
        <div className="max-md:justify-center max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[20vw]
         max-md:bg-white max-md:rounded-lg">
          <img src="/Page42.png" alt="Service" className="w-[7vw] h-[10vw] mx-2" />
          <p className="font-semibold">7+  <span className="font-[400]  "> Service</span> </p>
        </div>
        <div className="max-md:justify-center  max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[20vw]
         max-md:bg-white max-md:rounded-lg">
          <img src="/Page43.png" alt="Fast Delivery" className="w-[7vw] h-[10vw] mx-2"  />
          <p className="font-semibold">Fast  <span className="font-[400]  ">Delivery</span></p>
        </div>
      </div>
    </section>
        </div>
  );
};

export default Page4;
