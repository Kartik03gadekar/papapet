"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import gsap from "gsap";
import { checkUser, logoutUser } from "@/store/Action/auth";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const NavPapaPet = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevScrollY = useRef(0);
  const circle = useRef(null);
  const dispatch = useDispatch();
  const { user, loading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        gsap.to(circle.current, { top: "-210%", duration: 1 });
      }
      if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
        gsap.to(circle.current, { top: "-350%", duration: 0.5 });
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16 justify-between p-5 flex-col bg-white transition-transform duration-300 max-md:px-5 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Desktop Navbar */}
      <div className="w-full flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <img className="h-10 object-contain" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/pet-supplies">Pet Supplies</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About Us</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <IconButton onClick={toggleMobileMenu} color="inherit">
            {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </IconButton>
        </div>

        {/* User Profile & Authentication */}
        {user ? (
          <div className="flex items-center gap-2">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => setMobileMenuOpen(false)} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: "45px" }} anchorOrigin={{ vertical: "top", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
                <Link href="/mediensure/profile">
                  <MenuItem onClick={() => setMobileMenuOpen(false)}>Profile</MenuItem>
                </Link>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
              </Menu>
            </Box>
            <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
          </div>
        ) : (
          <Link href="/papapet/auth" className="text-lg flex items-center gap-2">
            Sign in <i className="ri-arrow-right-circle-fill text-lg"></i>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
        <div className="absolute top-5 right-5">
          <IconButton onClick={toggleMobileMenu}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <nav className="flex flex-col gap-6 text-xl font-semibold">
          <Link href="/" onClick={toggleMobileMenu}>Home</Link>
          <Link href="/services" onClick={toggleMobileMenu}>Services</Link>
          <Link href="/pet-supplies" onClick={toggleMobileMenu}>Pet Supplies</Link>
          <Link href="/blogs" onClick={toggleMobileMenu}>Blogs</Link>
          <Link href="/about" onClick={toggleMobileMenu}>About Us</Link>
          {user && <Link href="/mediensure/profile" onClick={toggleMobileMenu}>Profile</Link>}
          {user ? (
            <button onClick={() => { dispatch(logoutUser()); toggleMobileMenu(); }} className="text-red-500">Logout</button>
          ) : (
            <Link href="/papapet/auth" onClick={toggleMobileMenu}>Sign In</Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavPapaPet;
