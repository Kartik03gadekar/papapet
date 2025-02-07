"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import gsap from "gsap";
import { checkUser } from "@/store/Action/auth";
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
      link: "/mediensure/profile",
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
          top: "-210%",
          duration: 1,
        });
      }
      if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
        gsap.to(circle.current, {
          top: "-350%",
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
      className={`w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16  justify-between p-5 flex-col bg-white transition-transform duration-300 max-md:px-5 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full flex items-center justify-between pb-2">
        <div className="flex items-center justify-center gap-2">
          <img className="object-contain h-10" src="/logo.png" alt="logo" />
          <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
        </div>
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
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <>
                    <Link href={`${setting.link}`}>
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem
                      key="Logout"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </>
                ))}
              </Menu>
            </Box>
            <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
           </div>
          </>
        ) : (
          <>
            <Link
              href={"/papapet/auth"}
              className="text-lg flex items-center justify-center gap-2"
            >
              Sign in
              <i className="ri-arrow-right-circle-fill text-lg"></i>
            </Link>
            <div
              ref={circle}
              className="w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2 bg-[#FFAD22] rounded-full"
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavPapaPet;
