"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { Pagination, Navigation } from "swiper/modules"; // Import Navigation module
import style from "./Types.module.css";
import Link from "next/link";

const Types = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const data = [
    { name: "Dog", img: "/Page31.jpg" },
    { name: "Cat", img: "/Page32.jpg" },
    { name: "Fish", img: "/Page33.jpg" },
  ];

  return (
    <div className="bg-[#FEF8EA] flex flex-col gap-[3vw] py-[2vw] overflow-hidden">
      {/* Brand Types - Swiper */}
      <section className="py-10 flex flex-col items-center justify-center px-[4vw]">
        <h2 className="text-2xl font-bold text-center mb-6">Browse By Types</h2>

        {/* Full-Width Swiper Brand Section */}
        <div className="w-full h-40 mt-10 flex items-center justify-center">
          <Swiper
            slidesPerView={3}
            spaceBetween={40}
            navigation={isLargeScreen} // Correctly use isLargeScreen
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Pagination, Navigation]}
            className={` ${style.swiper} `}
          >
            {brands.map((brand, index) => (
              <SwiperSlide
                key={index}
                className={`flex flex-col items-center justify-center gap-20 ${style.swiper}`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-yellow-500 rounded-full flex items-center justify-center">
                    <img
                      src={brand.img}
                      alt="Brand Image"
                      className="max-md:w-70 max-md:h-70 object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Category Section */}
      <div className="flex flex-col gap-[2.4vw]">
        <h2 className="text-2xl font-bold text-center mb-6">Pet Type</h2>
        <div className="w-screen flex items-center justify-around max-md:flex max-md:items-center max-md:justify-around max-md:w-screen max-md:px-[2vw]">
          {data.map((i, index) => (
            <Link key={index} href={i.link || "#"}>
              <div className="flex flex-col items-center gap-6 cursor-pointer">
                {/* Image Container */}
                <div className="h-[13vw] w-[13vw] max-md:h-[25vw] max-md:w-[25vw] rounded-full overflow-hidden border-2 max-md:border-none flex items-center justify-center hover:shadow-lg transition-all duration-300">
                  <img className="h-full w-full object-cover" src={i.img} alt={i.name} />
                </div>

                {/* Category Name */}
                <h1 className="font-semibold text-2xl max-md:text-lg">{i.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Types;
