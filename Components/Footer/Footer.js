import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      {/* Logo & Quick Info Section */}
      <div className="w-full bg-white flex flex-col md:flex-row justify-between  gap-20 px-2  ">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex ">
        <Image 
          src="/Footerimg2.png" 
          alt="Pet Newsletter" 
          width={600} 
          height={300} 
          className="object-contain"
        />
      </div>

      {/* Right Side - Subscription Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center  md:items-start  md:text-left">
        <p className="text-gray-700 font-medium text-lg">
          Paw-some news delivered straight to your inbox.
        </p>
        
        <div className="flex w-full max-w-md border rounded-lg overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="EMAIL OR PHONE NUMBER"
            className="w-full px-4 py-2 bg-[#F2F2F2] text-gray-600 outline-none"
          />
          <button className="bg-orange-500 text-white px-5 py-2 font-semibold hover:bg-orange-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
      {/* Footer Links */}
      <div className="w-full bg-[#0d9899] text-black border-t-2">
        <footer className="container mx-auto px-10 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* About */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">About PaPaPet</h2>
            <a className="block hover:text-white">Who We Are</a>
            <a className="block hover:text-white">Blog</a>
            <a className="block hover:text-white">Work With Us</a>
            <a className="block hover:text-white">Investor Relationship</a>
          </nav>

          {/* PetaVerse */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">PetaVerse</h2>
            <a className="block hover:text-white">PaPaPet</a>
            <a className="block hover:text-white">Feeding India</a>
            <a className="block hover:text-white">Hyperpure</a>
            <a className="block hover:text-white">Contact</a>
          </nav>

          {/* For Sellers */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">For Sellers</h2>
            <a className="block hover:text-white">Partner With Us</a>
            <a className="block hover:text-white">Website For You</a>
          </nav>

          {/* Learn More */}
          <nav className="space-y-2">
            <h2 className="text-lg font-bold">Learn More</h2>
            <a className="block hover:text-white">Privacy</a>
            <a className="block hover:text-white">Security</a>
            <a className="block hover:text-white">Terms</a>
          </nav>

          {/* Social Links */}
          <nav className="text-center">
            <h2 className="text-lg font-bold">FOLLOW US</h2>
            <div className="flex justify-center gap-4 mt-3 text-2xl">
              <a href="#" className="hover:text-white">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="ri-youtube-fill"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </nav>
        </footer>
      </div>

      {/* Bottom Copyright Section */}
      <div className="w-full text-center bg-[#0d9899] text-white py-4 text-lg">
        {/* &copy; {new Date().getFullYear()} PaPaPet. All rights reserved. */}
        ISO Certified MSME Registered ©all right reserve
      </div>
    </>
  );
};

export default Footer;
