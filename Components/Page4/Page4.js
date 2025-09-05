"use client";
import Image from "next/image";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import style from "./Page4.module.css";
import Link from "next/link";
import LazyImage from "../LazyImage";

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
    { img: "/brands/pedigree.png", name: "pedigree" },
    { img: "/brands/drools.jpg", name: "drools" },
    { img: "/brands/royalcanin.png", name: "royalcanin" },
    { img: "/image4.jpg", name: "smartheart" },
    { img: "/image5.png", name: "acana" },
    { img: "/brands/purina.png", name: "purina" },
    { img: "/brands/whiskas.png", name: "whiskas" },
    { img: "/brands/sheba.png", name: "sheba" },
    { img: "/brands/farmina.png", name: "farmina" },
  ];

  const posters = [
    { img: "/posters/home1.png" },
    { img: "/posters/home2.png" },
    { img: "/posters/home3.png" },
    { img: "/posters/home4.png" },
    { img: "/posters/home5.png" },
  ];

  return (
    <div>
      <section id="supplies">
        <div className="h-auto w-full">
          <Swiper
            pagination={true}
            autoplay={{
              delay: 2500, // time between slides (ms)
              disableOnInteraction: false, // keep autoplay after user swipes
            }}
            speed={1000} // smooth transition speed
            modules={[Pagination, Autoplay]}
            className="mySwiper h-auto w-screen "
          >
            {posters.map((poster, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center text-center text-[18px]"
                >
                  <div className="h-auto max-md:w-screen max-md:flex max-md:items-center max-md:justify-center p-5 mb-5">
                    <LazyImage
                      className="rounded-2xl h-full w-full object-cover"
                      src={poster.img}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      <div className="w-full flex flex-col items-center py-10 max-md-py-0 px-4 bg-gradient-to-t from-[#84DCC6] to-white">
        {/* Title */}
        <div className="text-center mt-12">
          <div className="flex items-end justify-center gap-5 ">
            <h1 className="text-4xl font-bold">
              Featured <span className="text-[#F9BF3C]">Brands</span>
            </h1>
            <img
              src="/serviceDog.png"
              className="max-md:h-[15vw] h-16"
              alt="Service Dog"
            />
          </div>
          <p className=" max-md:hidden text-lg max-md:text-base mt-2">
            Experience the best of the best. Shop our featured brands for
            quality and style.
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
            modules={[Pagination, Navigation]}
            className={` ${style.swiper} `} // Ensures full width
          >
            {brands.map((brand, index) => (
              <SwiperSlide
                key={index}
                className={`  flex flex-col items-center justify-center gap-20
            ${style.swiper} `}
              >
                <div className="w-full flex flex-col items-center justify-center ">
                  <div className="w-24 h-24 md:w-30 md:h-30 border-4 border-yellow-500 rounded-full flex items-center justify-center   ">
                    <Link href={`/papapet/food?brand=${brand.name}`}>
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-full h-full rounded-full object-contain"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* <section className="hidden max-md:flex max-md:w-screen max-md:h-fit    max-md:flex-col max-md:items-center max-md:py-6">
       
        <div className="bg-gradient-to-t from-[#FFDEBA] to-white max-md:w-full max-md:py-5 max-md:px-5 flex flex-col items-center justify-center">
          <div className="flex items-end justify-start gap-5 ">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
              Featured <span className="text-teal-500">Products</span>
              <Image src="/serviceDog.png" alt="Dog" width={40} height={40} />
            </h2>
          </div>

     
          <div className="w-full flex justify-center">
            <div className="grid max-md:grid-cols-2 grid-cols-4 gap-5 mt-6 w-full max-w-6xl h-fit justify-items-center">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="h-[55vw] w-[45vw] px-4 py-2 shadow-md rounded-lg bg-gradient-to-b from-[#FBFEFD] to-[#DCF8F0] flex flex-col items-start"
                >
                  <h6 className="text-lg font-[500] ">PaPaPet</h6>
                  <h3 className="text-xl font-[700] ">{product.name}</h3>
                  {/* <p className="text-sm text-gray-600 font-[400] mb-[4] leading-[1.1] ">{product.description}</p> 
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto max-md:h-[40vw]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

    
        <div className=" max-md:flex max-md:w-screen   max-md:gap-2 max-md:bg-teal-100 py-4  px-2  max-md:items-center  justify-center  max-md:mt-[4vw]  ">
          <div
            className="max-md:justify-center tween  max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[15vw]
         max-md:bg-white  max-md:rounded-lg"
          >
            <img
              src="/Page41.png"
              alt="Products"
              className="w-[7vw] h-[10vw] mx-2 "
            />
            <p className="font-semibold">
              100+ <br /> <span className="font-[400]  ">Products</span>
            </p>
          </div>
          <div
            className="max-md:justify-center max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[15vw]
         max-md:bg-white max-md:rounded-lg"
          >
            <img
              src="/Page42.png"
              alt="Service"
              className="w-[7vw] h-[10vw] mx-2"
            />
            <p className="font-semibold">
              7+ <br /> <span className="font-[400]  "> Service</span>{" "}
            </p>
          </div>
          <div
            className="max-md:justify-center  max-md:flex max-md:items-center max-md:gap-1 max-md:w-[40vw] max-md:h-[15vw]
         max-md:bg-white max-md:rounded-lg"
          >
            <img
              src="/Page43.png"
              alt="Fast Delivery"
              className="w-[7vw] h-[10vw] mx-2"
            />
            <p className="font-semibold">
              Fast <br /> <span className="font-[400]  ">Delivery</span>
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Page4;
