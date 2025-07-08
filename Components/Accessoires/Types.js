"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import style from "./Types.module.css";
import Link from "next/link";
// import Image from "next/image";

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
    { name: "Jiggly Ball", description: "Bouncy fun toy", image: "/Page4Product1.png" },
    { name: "Glides", description: "Sliding fun toy", image: "/Page4Product2.png" },
    { name: "Toothie", description: "Dental care toy", image: "/Page4Product3.png" },
    { name: "Chewie", description: "Squeaky fun toy", image: "/Page4Product4.png" },
  ];

  const brands = [
    { img: "/walkingPet.png" },
    { img: "/doctorPapaper.png" },
    { img: "/dayCare.png" },
    { img: "/grooming.png" },
  ];

  const petTypes = [
    { name: "Dog", img: "/Page31.jpg", link: "/dogs" },
    { name: "Cat", img: "/Page32.jpg", link: "/cats" },
    { name: "Fish", img: "/Page33.jpg", link: "/fish" },
  ];

  return (
    <div className="bg-[#F4EEE1] flex flex-col gap-10 py-8 overflow-hidden">
      {/* Brand Types - Swiper */}
   

   {/* Pet Type Section */}
<div className="flex flex-col gap-8">
  <h2 className="text-2xl font-bold text-center mb-6">Pet Type</h2>
  <div className="flex items-center justify-around px-4 flex-wrap gap-6 
      max-md:flex-nowrap max-md:overflow-x-auto max-md:gap-4 max-md:justify-start">
      
      <div className="flex items-center justify-between max-md:flex  max-md:items-center   max-md:justify-around  max-md:w-screen w-[80%] max-md:px-[2vw]  ">
        {petTypes?.map((i, index) => (
           
          <Link key={index} href={`/papapet/product/type/${i.name}`}>
            <div className="flex flex-col items-center gap-6 cursor-pointer">
              {/* Image Container */}
              <div className="h-[13vw] w-[13vw] max-md:h-[25vw] max-md:w-[25vw] rounded-full overflow-hidden border-2  max-md:border-none flex items-center justify-center hover:shadow-lg transition-all duration-300">
                <img className="h-full w-full object-cover" src={i?.img} alt={i?.name} />
              </div>

              {/* Category Name */}
              <h1 className="font-semibold text-2xl max-md:text-lg">{i?.name}</h1>
            </div>
          </Link>
        ))}
  
  </div>
  </div>

</div>


      {/* Products Grid */}
      <h2 className="text-2xl font-bold text-center mt-2 mb-2">Featured Products</h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-6  max-w-6xl mx-auto px-[3vw] ">
         
        {products.map((product, index) => (
          <div key={index} className="h-[17vw]  max-md:h-[60vw] max-md:py-2 w-full px-4 py-2 shadow-md rounded-lg bg-gray-100 flex flex-col items-center ">
            <h6 className="text-sm  max-md:text-[4vw] font-medium text-gray-700">PaPaPet</h6>
            <h3 className="text-lg  max-md:text-[4vw] font-bold text-gray-900">{product.name}</h3>
            <img src={product.image} alt={product.name}  className="w-[4vw]  max-md:w-[12vw] object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
