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
    <nav className="w-full  h-[5vw]  bg-red-200  max-md:w-screen">     <NavPapaPet/> </nav>

     {/* Hero Section */}
    
 
       
     <section className="relative w-full h-screen max-md:h-auto max-md:pb-10 text-white flex flex-col md:flex-row justify-between items-center px-8 gap-8">
  
  {/* Left Content */}
  <div className="w-full md:w-1/3 flex flex-col items-start justify-start gap-[5vw] 
  max-md:gap-[2vw] max-md:w-full max-md:text-center max-md:items-center max-md:pt-[20vw]">

  {/* Desktop Heading */}
  <h1 className="hidden md:block text-6xl font-bold leading-[1.2] text-black text-left px-[1vw]">
    <span className="text-black block pb-4">The Perfect</span> 
    <span className="text-teal-400 block pb-4">Pet Match,</span> 
    <span className="text-black block pb-4">Just a Click</span>
    <span className="text-black block pb-4">Away!</span>
  </h1>

  {/* Mobile Heading */}
  <h1 className="max-md:block max-md:pb-2 hidden text-3xl leading-tight font-bold text-black text-center px-[4vw] ">
    The Perfect
    <span className="text-teal-400 block pb-1 pt-1">Pet Match,</span>  
    Just a Click Away!
  </h1>

  {/* Button */}
  <button className="bg-yellow-400 px-6 py-3 rounded-full text-black font-semibold shadow-lg">
    Book Now
  </button>

</div>


  {/* Middle - Image */}
  <div className="w-full md:w-1/3 flex justify-center relative">
    <img
      src="/GirlDoctor.png" // Replace with actual img path
      alt="Veterinarian with Pet"
      className="rounded-lg w-[60vw] md:w-[20vw]  max-md:w-[55vw] "
    />
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/3 flex flex-col items-center justify-start gap-[8vw] max-md:w-full max-md:items-center max-md:gap-[6vw]">

    <div className="bg-yellow-100 p-4 rounded-lg shadow-lg flex items-center space-x-3 max-md:w-[80%]">
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
  
    <div className="bg-[#77C5C6] w-[90%] np  h-[20vw] max-md:h-auto rounded-xl flex flex-col items-center px-4 py-2">
      <form className="w-full flex flex-col items-start justify-center gap-4">
        <label className="block text-gray-800 font-semibold text-lg">Owner Name</label>
        <input
          type="text"
          placeholder="Kartik"
          className="w-full max-md:w-[80%]  outline-none h-10 placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm"
        />
        <label className="block text-gray-800 font-semibold text-lg">Category</label>
        <select className="w-full max-md:w-[80%]  outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm">
          <option>DOG</option>
          <option>CAT</option>
        </select>
        <label className="block text-gray-800 font-semibold text-lg">Appointment Date</label>
        <input
          type="date"
          className="w-full max-md:w-[80%] outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm"
        />
      </form>
    </div>

  </div>
</section>


   
   

     {/* Services Section */}
<section className="py-8 text-center bg-[#F4EEE1]">
  {/* Grid structure for mobile view (2 services per row) */}
  <div className="grid grid-cols-1 md:flex md:items-center md:justify-around  px-6 max-md:px-3 max-md:grid-cols-2 max-md:gap-4">
    {services.map((service, index) => (
      <div 
        key={index} 
        className="bg-white w-[18vw] h-[13vw] max-md:w-[45vw] max-md:h-[42vw] 
        rounded-lg shadow-md flex flex-col items-center justify-center p-2"
      >
        <img 
          src={service.img} 
          alt={service.name}  
          className="rounded w-[10vw] max-md:w-[25vw]"
        />
        <h3 className="mt-2 font-medium text-[1vw] max-md:text-[3.7vw] ">
          {service.name}
        </h3>
        <p className="text-xs text-gray-400 max-md:text-[3vw]">
          {service.p}
        </p>
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
  
  {/* Updated Grid Layout */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-md:grid-cols-2">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white px-4 py-2 rounded-lg border border-orange-300 text-center">
        <img src="/doctorimagepng (1).png" alt="Doctor" width={80} height={80} className="mx-auto" />
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
