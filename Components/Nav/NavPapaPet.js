"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import gsap from "gsap";
import { checkUser, logoutUser } from "@/store/Action/auth";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

const NavPapaPet = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0);
  const circle = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loading, message } = useSelector((state) => state.auth);
  useEffect(() => {}, [loading, message]);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const settings = [
    {
      name: "Profile",
      link: "/papapet/profile",
    },
  ];
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    dispatch(checkUser());
  }, []); 
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        gsap.to(circle.current, {
          top: "-300%",
          duration: 1,
        });
      }
      if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
        gsap.to(circle.current, {
          top: "-400%",
          // opacity: 0,
          duration: 0.5,
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
      className={`  w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16   justify-between p-5 flex-col
        transition-transform duration-300 max-md:px-5 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex items-center justify-between pb-2">
             <Link href={"/"}> 
        <div className="flex items-center justify-center gap-2">
     
          <img className="object-contain h-10" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
        
        </div>
        </Link>
        <div className="flex items-center justify-center gap-7 relative z-20 max-md:hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Services</Link>
          <Link href={"/"}>Pet Supplies</Link>
          <Link href={"/"}>Blogs</Link>
          <Link href={"/"}>About Us</Link>
        </div>
        {user ? (
       <>
       <div className="flex items-center justify-center gap-2">
         <Box sx={{ flexGrow: 0 }}>
           <Tooltip title="Open profile">
             <IconButton onClick={() => window.location.href = "/papapet/profile"} sx={{ p: 0 }}>
               {/* Circle Avatar or Just Circle */}
               <div className="w-10 h-10 bg-[#0D9899] rounded-full flex items-center justify-center text-white font-semibold">
                 {user?.name?.charAt(0)} {/* Display first letter of user's name */}
               </div>
             </IconButton>
           </Tooltip>
         </Box>
         <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
       </div>
     </>
        ) : (
          <>
            <Link
              href={"/papapet/auth"}
              className="max-md:hidden text-lg flex items-center justify-center gap-2"
            >
              Sign in
              <i className="ri-arrow-right-circle-fill text-lg"></i>
            </Link>
            <div
  ref={circle}
  className="w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2 
             bg-[#FFAD22] rounded-full flex items-center justify-center gap-[2vw] 
           
            "
>
  {/* Search Icon */}
  <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 
                     hover:bg-white hover:text-[#0D9899] focus:bg-white focus:text-[#0D9899]">
    <i className="ri-search-line"></i>
  </button>

  {/* Menu Icon */}
  <Link  href={"/papapet/auth"} >
  <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 
                     hover:bg-white hover:text-[#0D9899] focus:bg-white focus:text-[#0D9899]">
    <i className="ri-menu-2-line"></i>
  </button>
  </Link>

</div>
<div

  className="w-[18vw] h-[18vw] absolute -top-[210%] left-1/2 -translate-x-1/2 
             bg-[#FFAD22] rounded-full flex items-end justify-center gap-[2vw]  
             max-md:w-[60vw] max-md:h-[60vw] max-md:absolute max-md:translate-x-10
             max-md:-right-[120%] max-md:-top-[150%] max-md:-z-20 max-md:px-3 max-md:pb-[16vw] max-md:pr-[17vw]"
>
  {/* Search Icon */}
  <button className="max-md:relative max-md:z-40   hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300 
                     max-md:hover:bg-white max-md:hover:text-[#0D9899] ">
    <i className="ri-search-line"></i>
  </button>

  {/* Menu Icon */}
  <Link  href={"/papapet/auth"} >
  <button className="max-md:relative max-md:z-40  hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300 
                     max-md:hover:bg-white max-md:hover:text-[#0D9899] ">
    <i className="ri-menu-2-line"></i>
  </button>
  </Link>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default NavPapaPet;
