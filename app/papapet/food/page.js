import FoodContainer from "@/Components/Food/FoodContainer";
import FoodSwiper from "@/Components/Food/FoodSwiper";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <NavPapaPet />

      <div className="container relative">
        {/* <FoodSwiper /> */}
        <div className="w-full h-screen  relative text-white flex items-center max-md:items-start">
          <img
            src="/foodBg.png"
            className="absolute bottom-0 right-28 object-cover max-md:hidden"
            alt=""
          />
          <div className="flex flex-col gap-10 absolute bottom-[20%] w-[80%]  items-start text-black left-10 max-md:top-1/2">
            <h1 className="text-black text-7xl font-bold leading-tight max-md:text-4xl gilroy">
              We Offer the <span className="text-[#0D9899]">Best</span> <br />
              Products for your <span className="text-[#FFAD22]">Pets</span>
            </h1>
            <p className="w-[54%] text-lg max-md:w-full">
              Because your pet deserves more than just a meal-they deserve a
              bowl full of love, care, and premium nutrition every day.
            </p>
            <div className="flex items-center  gap-4 ">
              <button className="linear rounded-full font-semibold text-lg">
                Explore Now{" "}
                <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
              </button>
              <Link
                href={"/"}
                className="border-b-2 font-semibold border-black"
              >
                Schedule a call
              </Link>
            </div>
          </div>
        </div>
        <FoodContainer />
      </div>
      <Footer />
    </>
  );
};

export default page;
