import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      {/* Logo & Quick Info Section */}
      <div className="w-full  flex flex-col md:flex-row justify-between  gap-20  max-md:gap-5 px-2  max-md:flex max-md:flex-col max-md:items-center  ">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex  ">
        <img 
          src="/Footerimgs2.png" 
          alt="Pet Newsletter" 
          width={600} 
          height={300} 
          className="object-contain"
        />
      </div>

      {/* Right Side - Subscription Form */}
      <div className="max-md:mb-[2vw] w-full md:w-1/2 flex flex-col items-center justify-center  md:items-start  md:text-left">
        <p className="text-gray-700 font-medium text-lg max-md:text-[4vw]">
          Paw-some news delivered straight to your inbox.
        </p>
        
        <div className="flex w-full max-w-md border rounded-lg overflow-hidden shadow-sm ">
          <input
            type="text"
            placeholder="EMAIL OR PHONE NUMBER"
            className=" max-md:placeholder:text-sm max-md:px-3 max-md:py-2 w-full px-4 py-2 bg-[#F2F2F2] text-gray-600 outline-none"
          />
          <button className="bg-orange-500 text-white  max-md:px-3 max-md:py-2 px-5 py-2 font-semibold transition duration-300 ease-in-out hover:bg-orange-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
      {/* Footer Links */}
      <div className="w-full max-md:bg-[#FFB828] bg-[#0d9899] text-black ">
      <div className=" flex items-center  gap-3 max-md:flex max-md:items-center max-md:justify-start max-md:gap-3 max-md:pt-[5vw] max-md:pl-[5vw]  pl-[2vw] pt-[2vw] ">
          <img className="object-contain h-10 max-md:h-[10vw]" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold text-white max-md:text-[#0D9899] ">PaPaPet</h1>
        </div>
        <footer className="container mx-auto px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10
       ">
          {/* About */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">About PaPaPet</h2>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Who We Are</a>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Blog</a>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Work With Us</a>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Investor Relationship</a>
          </nav>

          {/* PetaVerse */}
          <nav className="space-y-2 max-md:hidden">
            <h2 className="text-lg font-bold ">PetaVerse</h2>
            <a className="block transition duration-300 ease-in-out hover:text-white ">PaPaPet</a>
            <a className="block transition duration-300 ease-in-out hover:text-white ">Feeding India</a>
            <a className="block transition duration-300 ease-in-out hover:text-white ">Hyperpure</a>
            <a className="block transition duration-300 ease-in-out hover:text-white ">Contact</a>
          </nav>

          {/* For Sellers */}
          <nav className="space-y-2 max-md:hidden">
            <h2 className="text-lg font-bold text-gray-800">For Sellers</h2>
            <a className="block transition duration-300 ease-in-out hover:text-white">Partner With Us</a>
            <a className="block transition duration-300 ease-in-out hover:text-white">Website For You</a>
          </nav>

          {/* Learn More */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">Learn More</h2>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Privacy</a>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Security</a>
            <a className="block transition duration-300 ease-in-out hover:text-white max-md:text-white">Terms</a>
          </nav>

          {/* Social Links */}
          <nav className="text-center max-md:w-[80vw] max-md:flex  max-md:flex-col max-md:items-center max-md:justify-center ">
            <h2 className="text-lg font-bold max-md:text-white">FOLLOW US</h2>
            <div className="flex justify-center gap-4 mt-3 text-2xl">
              <a href="#" className="transition duration-300 ease-in-out hover:text-white">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="transition duration-300 ease-in-out hover:text-white">
                <i className="ri-youtube-fill"></i>
              </a>
              <a href="#" className="transition duration-300 ease-in-out hover:text-white">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="transition duration-300 ease-in-out hover:text-white">
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </nav>
        </footer>
      </div>

      {/* Bottom Copyright Section */}
      <hr   />
      <div className="w-full text-center  max-md:bg-[#FFB828] bg-[#0d9899] max-md:text-black text-zinc-800 py-4 text-lg">
        {/* &copy; {new Date().getFullYear()} PaPaPet. All rights reserved. */}
        ISO Certified MSME Registered ©all right reserve
      </div>
    </>
  );
};

export default Footer;
