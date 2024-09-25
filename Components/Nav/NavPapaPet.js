"use client";
import { checkUser } from "@/store/Action/auth";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Avatar, Typography } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavPapaPet = () => {
  const settings = [
    {
      name: "Profile",
      link: "/mediensure/profile",
    },
  ];
  const { user } = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loading, message } = useSelector((state) => state.auth);
  useEffect(() => {}, [loading, message]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <div className="w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16 justify-between p-5 flex-col bg-[#f9bf3c]">
      {/* <div className="flex items-center gap-4">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <img className="object-contain h-10 " src="/logo.png" alt="" />
          <h1 className="font-[gilroy]">PaPaPet</h1>
        </Link>
        <h1>Home</h1>
        <h1>Find A Pet</h1>
        <h1>Donation</h1>
        <h1>Volunteer</h1>
      </div> */}
      {/* {user ? (
        <>
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
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem key="Logout" onClick={() => dispatch(logoutUser())}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ))}
            </Menu>
          </Box>
          <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
        </>
      ) : (
        <Link href={"/papapet/auth"} className="outline-none border-none">
          Login/Sign Up
        </Link>
      )} */}
      <div className="w-full flex items-center justify-between border-b-[1px]  border-black pb-2">
        <h1 className="text-2xl font-semibold">PaPaPet</h1>
        <div className="w-fit px-4 py-2 bg-[rgba(255,251,251,0.26)] rounded-full">
          <i className="ri-search-line"></i>
          <input
            type="text"
            className="outline-none border-none bg-transparent "
            placeholder="Search"
          />
        </div>
        <div className="flex items-center text-xl justify-center gap-7">
          <i className="ri-user-fill"></i>
          <i className="ri-shopping-cart-2-fill"></i>
          <h3 className="text-sm">
            My Cart <br />6 Item
          </h3>
        </div>
      </div>
      <div className="w-full flex items-center justify-between text-black pt-2 text-base  px-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Services</Link>
        <Link href={"/"}>Pet Supplies</Link>
        <Link href={"/"}>Pets</Link>
        <Link href={"/"}>Blogs</Link>
        <Link href={"/"}>About Us</Link>
        <Link href={"/"}>Login</Link>
      </div>
    </div>
  );
};

export default NavPapaPet;
