import FoodContainer from "@/Components/Food/FoodContainer";
import Footer from "@/Components/Footer/Footer";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
     <div className="overflow-hidden">
       <NavPapaPet />
      <div className=" w-screen mb-6 ">
        <div className="  flex items-center justify-between h-screen px-10 py-[8vw] pl-[3vw]  
        max-md:flex-col max-md:px-5  max-md:gap-[0vw] max-md:h-fit max-md:pt-[1vw] pt-[6vw] ">
          
          {/* Left Content */}
          <div className=" flex flex-col gap-6 w-1/2 text-black  
           max-md:w-full max-md:text-start max-md:pb-[10vw] max-md:pl-[2vw] max-md:pt-[12vw]">
            <h1 className="  text-black text-5xl text-[gilroy] font-bold leading-tight max-md:text-[7vw]  max-md:mb-1 ">
              We Offer the <span className="text-[#0D9899]">Best</span> <br />
              Products for your <span className="text-[#FFAD22]">Pets</span>
            </h1>
            <p className="text-lg w-[80%] max-md:w-full max-md:text-base max-md:px-0">
              Because your pet deserves more than just a meal—they deserve a
              bowl full of love, care, and premium nutrition every day.
            </p>
            <div className="flex items-center gap-4  pt-[1.7vw]  max-md:w-full max-md:justify-start">
              <button className="linear rounded-full font-semibold text-lg px-6 py-2 max-md:text-sm max-md:px-4 max-md:py-2">
                Explore Now{" "}
                <i className="ri-arrow-right-s-line bg-white rounded-full"></i>
              </button>
             
            </div>
          </div>


          
          <div className="w-1/2 flex justify-end max-md:w-full max-md:justify-center max-md:mr-8">
            <img
              src="/foodBg.png"
              className="w-[40vw] object-cover max-md:w-[90vw]"
              alt="Dog"
            />
          </div>
        </div>

        <FoodContainer />   
        
      </div>
      <Footer />
     </div>
    </>
  );
};

export default Page;
