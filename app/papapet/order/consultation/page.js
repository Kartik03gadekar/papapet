import React from "react";
import Link from "next/link";
import NavPapaPet from "@/Components/Nav/NavPapaPet";

const page = () => {
  return (
    <section className="overflow-hidden">
      <NavPapaPet />
      <div className=" h-[89vh] w-full flex flex-col gap-10 items-center justify-center text-center">
        <div className=" flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl md:text-5xl text-nowrap font-black">
            Consultancy Confirmed!
          </h1>
          <p className="text-sm md:text-lg">Our veterinary expert will contact you soon...</p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/doctorsuccess.png" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <h4>For any queries, contact <span className="link text-blue-500">support@papapet.com</span>.</h4>
          <Link href="/">
            <button className="bg-[#FFAD22] px-5 py-3 rounded-xl text-white font-bold">Go Home</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
