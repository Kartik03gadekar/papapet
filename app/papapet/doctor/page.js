"use client";
import React from "react";
import Image from "next/image";
import NavPapaPet from "@/Components/Nav/NavPapaPet";

const Page = () => {
  const services = [
    { img: "/doctorimage1.png", name: "Instant Video Consultation", p: "Connect Within 30 sec" },
    { img: "/doctorimage2.png", name: "Find Doctors Near You", p: "Confirmed Appointment" },
    { img: "/doctorimage3.png", name: "In-Clinic Services", p: "Best clinic near you" },
    { img: "/doctorimage4.png", name: "Home Services", p: "Best Home Services" },
  ];

  return (
    <div className="w-full">
    <nav className="w-full  h-[5vw]  bg-red-200">     <NavPapaPet/> </nav>

     {/* Hero Section */}
    
 
       
     <section className="relative w-[100%] h-screen text-white flex flex-col md:flex-row justify-between items-center  px-8 gap-8">
  
  {/* Left Content */}
  <div className="w-[30%] h-screen md:w-1/3 text-left flex flex-col items-start justify-start gap-[5vw] pt-[5vw]  ">
  <h1 className="text-3xl md:text-6xl font-bold leading-[1.4]">
  <span className="text-black block pb-2">The Perfect</span> 
  <span className="text-teal-400 block pb-2">Pet Match,</span> 
  <span className="text-black block pb-2">Just a Click</span>
  <span className="text-black block pb-2">Away!</span>
</h1>

    <button className=" bg-yellow-400 px-6 py-3 rounded-full text-black font-semibold shadow-lg">
      Book Now
    </button>
  </div>

  {/* Middle - Image */}
  <div className="w-[35%] md:w-1/3 flex justify-center relative">
    <img
      src="/GirlDoctor.png" // Replace with actual img path
      alt="Veterinarian with Pet"
   
      className="rounded-lg w-[20vw] "
    />
    

  </div>


 <div className="  w-[35%] h-screen flex flex-col  items-center justify-start gap-[12vw]  ">

    <div className=" bg-yellow-100 p-4 rounded-lg shadow-lg flex items-center space-x-3">
     
      <p className="text-sm font-medium text-gray-700">
        Generate your Pet’s Health Report in just a few clicks
      </p>

      <img
        src="/FloatingBanner.png" // Replace with actual icon path
        alt="Health Report"
        width={40}
        height={40}
      />
    </div>
  
  <div className="bg-[#77C5C6] w-[22vw] h-[20vw] rounded-xl " >
    <form className="pl-[2vw] pt-[2vw] flex flex-col items-start justify-center gap-2">
    <label className="block text-gray-800 font-semibold text-lg">Owner Name</label>
      <input
        type="text"
        placeholder="Kartik"
        className="w-[80%] outline-none h-[2.5vw] placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm"
      />
    <label className="block text-gray-800 font-semibold text-lg">Category</label>
      <select className="w-[80%] outline-none h-[2.5vw] placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm">
        <option>DOG</option>
        <option>CAT</option>
      </select>
      <label className="block text-gray-800 font-semibold text-lg">Appointment Date</label>
      <input
        type="date"
        className="w-[80%] outline-none h-[2.5vw] placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm"
      />
    </form>
  </div>
    


 </div>
</section>

   
   

      {/* Services Section */}
      <section className="py-8 text-center bg-[#F4EEE1]">
        <div className="flex items-center justify-around  mt-6 px-6 max-md:gap-[4vw] max-md:flex max-md:flex-col max-md:items-center">
          {services.map((service, index) => (
            <div key={index} className="bg-white w-[18vw] h-[13vw] max-md:w-[60vw] max-md:h-[42vw] rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <img src={service.img} alt={service.name}  className="rounded w-[10vw] max-md:w-[20vw]" />
              <h3 className="mt-2 font-medium text-[1vw] max-md:text-[4vw] max-md:text-lg">{service.name}</h3>
              <p className="text-xs text-gray-400 max-md:text-[3vw]">{service.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Doctors Section */}
      <section className="py-10 px-6 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold">Trusted Doctors Near You</h2>
        <input
          type="text"
          placeholder="Search Top doctors around here..."
          className="mt-4 p-2 w-full md:w-1/2 border border-gray-300 rounded-md placeholder:pl-2"
        />
      </section>

      {/* Best Doctors Section */}
      <section className="py-10 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center">Best Doctors Connected With Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-md:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white px-4 py-2 rounded-lg border border-orange-300 text-center">
              <Image src="/doctorimagepng (1).png" alt="Doctor" width={80} height={80} className="mx-auto" />
              <h3 className="mt-2 font-medium max-md:text-[4vw]">Dr. Abhinav Jain</h3>
              <h4 className="text-sm max-md:text-[3vw]">City-Bhopal</h4>
              <p className="text-sm text-gray-500 max-md:text-[2.5vw]">Connect Within 60 sec</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
