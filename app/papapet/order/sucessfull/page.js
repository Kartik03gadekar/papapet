"use client";

import React from "react";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";

const Page = () => {
  return (
    <div className=" bg-white min-h-screen  flex flex-col items-center justify-center p-6">
      <div className="h-[5vw] w-screen">
        <NavPapaPet />
      </div>

     
        <div className="   text-center w-full  flex flex-col items-center justify-center">
          <img
            src="/ordersucessfullimage.png"
            alt="Cool Dog"
        
            className=" w-[20vw] max-md:w-[200px] "
          />
          <h2 className="text-2xl font-semibold mt-5">
            Your order is successfully place
          </h2>
          <p className="w-[40%] text-gray-600 mt-2 ">
            Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec
            volutpat mollis nulla non facilisis.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link href={"/papapet/dashboard"}> 
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
              GO TO DASHBOARD
            </button>
            </Link>
              <Link href={"/papapet/dashboard"}> 
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center">
              VIEW ORDER 
           
            </button>
            </Link>
          </div>
        </div>
    
    </div>
  );
};

export default Page;
