import FoodContainer from "@/Components/Food/FoodContainer";
import Footer from "@/Components/Footer/Footer";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <NavPapaPet />
      <div className=" relative  ">
        <div className="  flex items-center justify-between h-screen px-10 py-[12vw] pl-[4vw]  
        max-md:flex-col max-md:px-5 max-md:gap-[4vw] max-md:h-auto max-md:py-20">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6 w-1/2 text-black  
           max-md:w-full max-md:text-start max-md:pb-[10vw] max-md:pl-[3vw] max-md:pt-[22vw]">
            <h1 className="text-5xl font-bold leading-tight gilroy max-md:text-3xl max-md:pl-0">
              We Offer the <span className="text-[#0D9899]">Best</span> <br />
              Products for your <span className="text-[#FFAD22]">Pets</span>
            </h1>
            <p className="text-lg w-[80%] max-md:w-full max-md:text-base max-md:px-0">
              Because your pet deserves more than just a meal—they deserve a
              bowl full of love, care, and premium nutrition every day.
            </p>
            <div className="flex items-center gap-4 max-md:w-full max-md:justify-start">
              <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-4 max-md:py-1">
                Explore Now{" "}
                <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
              </button>
              <Link
                href={"/"}
                className="border-b-2 font-semibold border-black max-md:hidden"
              >
                Schedule a call
              </Link>
            </div>
          </div>

          {/* Right Content (Dog Image) */}
          <div className="w-1/2 flex justify-end max-md:w-full max-md:justify-center max-md:mt-4 max-md:mr-8">
            <img
              src="/foodBg.png"
              className="w-[40vw] object-cover max-md:w-[80vw]"
              alt="Dog"
            />
          </div>
        </div>

        <FoodContainer />
      </div>
      <Footer />
    </>
  );
};

export default Page;
