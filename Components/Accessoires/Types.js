"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import style from "./Types.module.css";
import Link from "next/link";

const Types = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    { img: "/walkingPet.png" },
    { img: "/doctorPapaper.png" },
    { img: "/dayCare.png" },
    { img: "/grooming.png" },
    { img: "/walkingPet.png" },
    { img: "/doctorPapaper.png" },
    { img: "/dayCare.png" },
    { img: "/grooming.png" },
  ];

  const petTypes = [
    { name: "Dog", img: "/Page31.jpg" },
    { name: "Cat", img: "/Page32.jpg" },
    { name: "Fish", img: "/Page33.jpg" },
  ];

  return (
    <div className="bg-[#F4EEE1] flex flex-col gap-10 py-8 overflow-hidden">
      {/* Brand Types - Swiper */}
      <section className="py-10 flex flex-col items-center px-8">
        <h2 className="text-2xl font-bold text-center mb-6">Browse By Types</h2>

        <div className="w-full h-40 mt-10 flex items-center justify-center">
          <Swiper
            slidesPerView={3}
            spaceBetween={40}
            navigation={isLargeScreen}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Pagination, Navigation]}
            className={style.swiper}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-yellow-500 rounded-full flex items-center justify-center">
                  <img
                    src={brand.img}
                    alt="Brand"
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Pet Type Section */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-center mb-6">Pet Type</h2>
        <div className="flex items-center justify-around px-4 flex-wrap gap-6">
          {petTypes.map((pet, index) => (
            <Link key={index} href={pet.link || "#"}>
              <div className="flex flex-col items-center gap-4 cursor-pointer">
                <div className="h-36 w-36 md:h-48 md:w-48 rounded-full overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
                  <img className="h-full w-full object-cover" src={pet.img} alt={pet.name} />
                </div>
                <h1 className="font-semibold text-xl">{pet.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="h-[30vw] md:h-[15vw] w-full px-4 py-4 shadow-md rounded-lg bg-gray-100 flex flex-col items-center"
          >
            <h6 className="text-lg font-medium text-gray-700">PaPaPet</h6>
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 md:w-32 md:h-32 object-contain mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
