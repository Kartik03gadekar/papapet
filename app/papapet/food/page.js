import FoodContainer from "@/Components/Food/FoodContainer";
import FoodSwiper from "@/Components/Food/FoodSwiper";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import React from "react";

const page = () => {
  return (
    <>
      <NavPapaPet />

      <div className="container translate-y-[10vh] bg-[#FEF8EA]">
        {/* <FoodSwiper /> */}
        <div className="w-full -mt-48 relative text-white">
          <img
            src="/foodBg.png"
            className="w-full object-cover  h-full"
            alt=""
          />
          <div className="flex flex-col gap-10 absolute bottom-[20%] w-[60%] items-start right-0">
            <h1 className="text-7xl  font-extrabold">
              We Offer the best products for your pets
            </h1>
            <h3 className="w-[80%] text-xl">
              "Because your pet deserves more than just a meal—they deserve a
              bowl full of love, care, and premium nutrition every day."
            </h3>
            <button className="p-5 bg-[#FEBC28] px-8 py-4 text-xl font-semibold rounded-xl">
              Buy Now
            </button>
          </div>
          <img src="/dogFood.png" className="absolute -bottom-20" alt="" />
        </div>
        <FoodContainer />
      </div>
    </>
  );
};

export default page;
