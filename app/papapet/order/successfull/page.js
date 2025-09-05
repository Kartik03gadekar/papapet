"use client";

import React from "react";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavPapaPet />
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-6 overflow-y-hidden">
          <div className="   text-center w-full  flex flex-col items-center justify-center">
            <img
              src="/ordersucessfullimage.png"
              alt="Cool Dog"
              className=" w-[20vw] max-md:w-[200px] "
            />
            <h2 className="text-2xl font-semibold mt-5">
              Paws up! Your order is on its way 🐾
            </h2>
            <p className="max-w-3xl text-gray-600 mt-2  px-5">
              "Woof Woof! Your order is confirmed and our furry friends are
              already sniffing around the shelves to fetch it. Sit back, relax, and get ready for tail wags and happy
              purrs at your doorstep!"
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <Link href={"/papapet/dashboard"}>
                <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                  GO TO DASHBOARD
                </button>
              </Link>
              <Link href={"/papapet/dashboard/orderhistory"}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center">
                  VIEW ORDER
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
