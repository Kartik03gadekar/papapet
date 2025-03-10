"use client";
import React from "react";
import Image from "next/image";

const Page = () => {
  const services = [
    { img: "/doctorimage1.png", name: "Instant Video Consultation", p: "Connect Within 30 sec" },
    { img: "/doctorimage2.png", name: "Find Doctors Near You", p: "Confirmed Appointment" },
    { img: "/doctorimage3.png", name: "In-Clinic Services", p: "Best clinic near you" },
    { img: "/doctorimage4.png", name: "Home Services", p: "Best Home Services" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen text-white flex flex-col justify-center max-md:justify-start max-md:pt-[50vw] max-md:gap-[7vw]  items-start px-8 md:px-20 max-md:w-full max-md:h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 max-md:w-screen  max-md:h-[200vw]">
        <Image
          src="/doctormainimage.png" // Replace with actual image path
          alt="Pet Care"
          layout="fill"
          objectFit="cover"
          className="opacity-70 max-md:relative max-md:w-full max-md:h-[80vw]"
        />
      </div>

      {/* Left Content */}
      <div className="w-full  max-md:w-screen max-md:px-[4vw]">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-black">The Perfect</span> 
          <span className="text-teal-400"> Pet </span> 
          <span className="text-black">Match, Just a Click Away!</span>
        </h1>
        <button className="mt-8 bg-yellow-400 px-6 py-3 rounded-full text-black font-semibold shadow-lg">
          Book Now
        </button>
      </div>

      {/* Appointment Form */}
      <div className="w-[22vw] h-[17vw] absolute right-[7vw] top-[23vw] px-6 py-4 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-md:hidden max-md:w-full max-md:p-4 max-md:mt-6">
        <form className="mt-4">
          <label className="text-black text-sm font-medium">Owner Name</label>
          <input
            type="text"
            placeholder="Kartik"
            className="w-full p-2 mt-1 outline-none text-gray-400 text-sm bg-white placeholder:pl-2 rounded-full"
          />

          <label className="text-black text-sm font-medium mt-4">Category</label>
          <select className="w-full p-2 mt-1 outline-none text-gray-400 text-sm bg-white placeholder:pl-2 rounded-full">
            <option>Dog</option>
            <option>Cat</option>
          </select>

          <label className="text-black text-sm font-medium mt-4">Appointment Date</label>
          <input
            type="text"
            placeholder="06/06/2025"
            className="w-full p-2 mt-1 outline-none text-gray-400 text-sm bg-white placeholder:pl-2 rounded-full"
          />
        </form>
      </div>
    </section>

      {/* Services Section */}
      <section className="py-8 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold">Our Best Services</h2>
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
