"use client";
import Link from "next/link";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Page3 = () => {
  const data = [
    { name: "Dog", img: "/Page3Dog.png" },
    { name: "Cat", img: "/Page3Cat.png" },
    { name: "Fish", img: "/Page3Fish.png" },
  ];

  return (
    <div className="h-fit w-full flex items-center justify-center py-[10vh] flex-col gap-16 max-md:py-[3vh]">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-end justify-center gap-5">
          <h1 className="text-5xl font-semibold pb-5 max-md:text-3xl">
            Shop by <span className="text-[#0D9899]">Category</span>
          </h1>
          <img src="/serviceDog.png" className="max-md:h-12 h-16" alt="Service Dog" />
        </div>
        <p className="text-lg max-md:text-base">
          Discover the perfect pet heating solutions to keep your beloved companions
          <br className="max-md:hidden" /> cozy and content all year round.
        </p>
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[80%] place-content-center place-items-center">
        {data?.map((i, index) => (
          <Link key={index} href={`${i.link || "#"}`}>
            <div className="flex flex-col items-center gap-6 cursor-pointer">
              {/* Image Container */}
              <div className="h-[14vw] w-[14vw] max-md:h-32 max-md:w-32 rounded-full overflow-hidden border-2 flex items-center justify-center hover:shadow-lg transition-all duration-300">
                <img className="h-full w-full object-cover" src={i?.img} alt={i?.name} />
              </div>

              {/* Category Name */}
              <h1 className="font-semibold text-2xl max-md:text-lg">{i?.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page3;
