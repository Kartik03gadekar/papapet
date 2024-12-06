"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import gsap from "gsap";

const NavPapaPet = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0);
  const circle = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        gsap.to(circle.current, {
          top:"-180%",
          duration:1
        });
      }
      if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
        gsap.to(circle.current, {
          top: "-350%",
          // opacity: 0,
          duration: .5,
        });
        setShowNavbar(false); // Hide navbar on scroll down
      }
      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {

        setShowNavbar(false); // Hide navbar on scroll down
      } else {
        setShowNavbar(true); // Show navbar on scroll up
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16 max-md:px-2 justify-between p-5 flex-col bg-white transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex items-center justify-between pb-2">
        <div className="flex items-center justify-center gap-2">
          <img className="object-contain h-10" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
        </div>
        <div className="flex items-center justify-center gap-7 relative z-20">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Services</Link>
          <Link href={"/"}>Pet Supplies</Link>
          <Link href={"/"}>Blogs</Link>
          <Link href={"/"}>About Us</Link>
        </div>
        <button className="text-lg flex items-center justify-center gap-2">
          Sign in
          <i className="ri-arrow-right-circle-fill text-lg"></i>
        </button>
        <div
          ref={circle}
          className="w-[20vw] h-[20vw] absolute -top-[180%] left-1/2 -translate-x-1/2 bg-[#FFAD22] rounded-full"
        ></div>
      </div>
    </div>
  );
};

export default NavPapaPet;
