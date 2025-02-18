"use client";
import { checkUser, logoutUser } from "@/store/Action/auth";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/* Navbar Container */}
      <div className="h-[10vh] z-50 p-5 bg-white text-sm font-light fixed w-full shadow-md flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-5">
          <IconButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </IconButton>
          <Link href={"/"} className="flex items-center gap-2">
            <img className="h-10 object-contain" src="/logo.png" alt="PaPaPet Logo" />
            <h1 className="font-[monument]">PaPaPet</h1>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex pl-24 items-center gap-5">
          <Link href={"/"} className="flex items-center gap-2">
            <img className="h-7 object-contain" src="/logo.png" alt="PaPaPet Logo" />
            <h1 className="font-[poppins] font-semibold">PaPaPet</h1>
          </Link>
          <Link href={"/mediensure/consultdr"}>Book Consultation</Link>
          <Link href={"/mediensure/Newdemo4"}>Our Network</Link>
          <Link href={"/mediensure/ivfnetwork"}>Ivf Network</Link>
        </div>

        {/* User & Authentication Section */}
        <div className="hidden md:flex items-center gap-5 pr-14">
          <Link href={"/mediensure/demo2"} className="flex items-center">
            For Corporate <img className="h-5" src="/down.png" alt="" />
          </Link>
          <Link href={"/mediensure/demo"} className="flex items-center">
            For Providers <img className="h-5" src="/down.png" alt="" />
          </Link>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Link href="/mediensure/profile">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={() => dispatch(logoutUser())}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href={"/mediensure/auth"}>
              <Button variant="outlined">Login/Register</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
        <div className="absolute top-5 right-5">
          <IconButton onClick={toggleMobileMenu}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <nav className="flex flex-col items-center justify-center gap-6 text-xl font-semibold mt-16">
          <Link href="/" onClick={toggleMobileMenu}>Home</Link>
          <Link href="/mediensure/consultdr" onClick={toggleMobileMenu}>Book Consultation</Link>
          <Link href="/mediensure/Newdemo4" onClick={toggleMobileMenu}>Our Network</Link>
          <Link href="/mediensure/ivfnetwork" onClick={toggleMobileMenu}>Ivf Network</Link>
          <Link href="/mediensure/demo2" onClick={toggleMobileMenu}>For Corporate</Link>
          <Link href="/mediensure/demo" onClick={toggleMobileMenu}>For Providers</Link>
          {user ? (
            <>
              <Link href="/mediensure/profile" onClick={toggleMobileMenu}>Profile</Link>
              <button onClick={() => { dispatch(logoutUser()); toggleMobileMenu(); }} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link href="/mediensure/auth" onClick={toggleMobileMenu}>Sign In</Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Nav;
