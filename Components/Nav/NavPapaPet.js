"use client"

import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import PhantomConnect from "../WalletProvider";

const NavPapaPet = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0);
  const circle = useRef(null);
  const [user, setUser] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const mobileMenuRef = useRef(null);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: "Profile",
      link: "/papapet/dashboard",
    },
  ];

  const openMenu = () => {
    setMenuVisible(true);
    setMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMenuVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // At top: animate circle closer to screen
        gsap.to(circle.current, { top: "-210%", duration: 1 });
        setShowNavbar(true);
      } else if (currentScrollY > prevScrollY.current) {
        // Scrolling down
        if (currentScrollY > 100) {
          setShowNavbar(false);
          gsap.to(circle.current, { top: "-400%", duration: 0.8 });
        }
      } else {
        // Scrolling up
        setShowNavbar(true);
        gsap.to(circle.current, { top: "-210%", duration: 0.8 });
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  if (!mobileMenuRef.current) return;

  if (mobileMenuOpen) {
    setMenuVisible(true); // Ensure it's in DOM
    gsap.fromTo(
      mobileMenuRef.current,
      { y: "-120%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, 
        // ease: "power3.out" 
      }
    );
  } else {
    gsap.to(mobileMenuRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      // ease: "power2.in",
      onComplete: () => setMenuVisible(false), // Hide after animation
    });
  }
}, [mobileMenuOpen]);


  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16 justify-between p-5 flex-col
        transition-transform duration-300 max-md:px-5 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full flex items-center justify-between pb-2">
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <img className="object-contain h-10" src="/logo.png" alt="logo" />
              <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-7 relative z-20 max-md:hidden">
            <Link href="/">Home</Link>
            <Link href="/">Services</Link>
            <Link href="/">Pet Supplies</Link>
            <Link href="/">Blogs</Link>
            <Link href="/">About Us</Link>
          </div>

          {user ? (
            <div className="flex items-center justify-center gap-2">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link href={setting.link}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem key="Logout" onClick={() => setUser(null)}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
            </div>
          ) : (
            <div className="flex">
              <Link
                href="/papapet/auth"
                className="max-md:hidden text-lg flex items-center justify-center gap-2"
              >
                Sign in
                <i className="ri-arrow-right-circle-fill text-lg"></i>
              </Link>
              <PhantomConnect/>

            </div>
          )}
        </div>

        <div
          ref={circle}
          className="desktop w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2 
             bg-[#FFAD22] rounded-full flex items-center justify-center gap-[2vw]"
        >
          <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D9899]">
            <i className="ri-search-line"></i>
          </button>
          <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D9899]">
            <i className="ri-menu-2-line"></i>
          </button>
        </div>

        <div
          className=" md:hidden mobile absolute -top-[160%] -right-[25%] w-[60vw] h-[60vw] bg-[#FFAD22] rounded-full 
  flex items-center justify-center gap-6 z-10 pr-20 pt-[24%]"
        >
          <div className= "flex items-center gap-4 vsmall">
            <button className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300">
              <i className="ri-search-line"></i>
            </button>
            <button
              onClick={openMenu}
              className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300"
            >
              <i className="ri-menu-4-fill"></i>
            </button>
          </div>
        </div>
      </div>

      {menuVisible && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 bg-white text-black flex flex-col p-6 gap-6 w-full h-full md:hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex  gap-4 items-center">
             <img className="object-contain h-10" src="/logo.png" alt="logo" />
            <h2 className="text-3xl font-bold text-[#0D9899]">PaPaPet</h2>
            </div>
            <button onClick={closeMenu}>
              <i className="ri-close-line text-3xl text-gray-600"></i>
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button className="bg-[#8B5CF6] text-white px-4 py-2 rounded-full">
              Connect Phantom Wallet
            </button>
            <Link
              href="/papapet/auth"
              onClick={closeMenu}
              className="bg-[#FFAD22] text-white px-4 py-2 rounded-full text-center"
            >
              Sign In / Sign Up
            </Link>

            <hr className="border-gray-300" />

            <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
              Home
            </Link>
            <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
              Services
            </Link>
            <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
              Pet Supplies
            </Link>
            <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
              Blogs
            </Link>
            <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
              About Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavPapaPet;



// {

//   // "use client";
// // import React, { useEffect, useRef, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import Link from "next/link";
// // import gsap from "gsap";
// // import { checkUser, logoutUser } from "@/store/Action/auth";
// // import {
// //   Avatar,
// //   Box,
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   Tooltip,
// //   Typography,
// // } from "@mui/material";
// // import PhantomConnect from "../WalletProvider";

// // const NavPapaPet = () => {
// //   const [showNavbar, setShowNavbar] = useState(true);
// //   const prevScrollY = useRef(0);
// //   const circle = useRef(null);
// //   const { user } = useSelector((state) => state.auth);

// //   const [anchorElNav, setAnchorElNav] = useState(null);
// //   const [anchorElUser, setAnchorElUser] = useState(null);
// //   const { loading, message } = useSelector((state) => state.auth);
// //   useEffect(() => {}, [loading, message]);
// //   const dispatch = useDispatch();
// //   const handleOpenNavMenu = (event) => {
// //     setAnchorElNav(event.currentTarget);
// //   };
// //   const handleOpenUserMenu = (event) => {
// //     setAnchorElUser(event.currentTarget);
// //   };

// //   const handleCloseNavMenu = () => {
// //     setAnchorElNav(null);
// //   };
// //   const settings = [
// //     {
// //       name: "Profile",
// //       link: "/papapet/dashboard",
// //     },
// //   ];
// //   const handleCloseUserMenu = () => {
// //     setAnchorElUser(null);
// //   };
// //   useEffect(() => {
// //     dispatch(checkUser());
// //   }, []);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;
// //       if (currentScrollY === 0) {
// //         gsap.to(circle.current, {
// //           top: "-300%",
// //           duration: 1,
// //         });
// //       }
// //       if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
// //         gsap.to(circle.current, {
// //           top: "-400%",
// //           // opacity: 0,
// //           duration: 0.5,
// //         });
// //         setShowNavbar(false); // Hide navbar on scroll down
// //       }
// //       if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
// //         setShowNavbar(false); // Hide navbar on scroll down
// //       } else {
// //         setShowNavbar(true); // Show navbar on scroll up
// //       }
// //       prevScrollY.current = currentScrollY;
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   return (
// //     <div
// //       className={` w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16   justify-between p-5 flex-col
// //         transition-transform duration-300 max-md:px-5 ${
// //         showNavbar ? "translate-y-0" : "-translate-y-full"
// //       }`}
// //     >
// //       <div className="w-full flex items-center justify-between pb-2">
// //              <Link href={"/"}> 
// //         <div className="flex items-center justify-center gap-2">
     
// //           <img className="object-contain h-10" src="/logo.png" alt="logo" />
// //           <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
        
// //         </div>
// //         </Link>
// //         <div className="flex items-center justify-center gap-7 relative z-20 max-md:hidden">
// //           <Link href={"/"}>Home</Link>
// //           <Link href={"/"}>Services</Link>
// //           <Link href={"/"}>Pet Supplies</Link>
// //           <Link href={"/"}>Blogs</Link>
// //           <Link href={"/"}>About Us</Link>
// //         </div>

// //         {user ? (
// //           <>
// //             <div className="flex items-center justify-center gap-2">
              
// //               <Box sx={{ flexGrow: 0 }}>
// //                 <Tooltip title="Open settings">
// //                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// //                     <Avatar
// //                       alt="Remy Sharp"
// //                       src="/static/images/avatar/2.jpg"
// //                     />
// //                   </IconButton>
// //                 </Tooltip>
// //                 <Menu
// //                   sx={{ mt: "45px" }}
// //                   id="menu-appbar"
// //                   anchorEl={anchorElUser}
// //                   anchorOrigin={{
// //                     vertical: "top",
// //                     horizontal: "right",
// //                   }}
// //                   keepMounted
// //                   transformOrigin={{
// //                     vertical: "top",
// //                     horizontal: "right",
// //                   }}
// //                   open={Boolean(anchorElUser)}
// //                   onClose={handleCloseUserMenu}
// //                 >
// //                   {settings.map((setting) => (
// //                     <>
// //                       <Link href={`${setting.link}`}>
// //                         <MenuItem
// //                           key={setting.name}
// //                           onClick={handleCloseUserMenu}
// //                         >
// //                           <Typography textAlign="center">
// //                             {setting.name}
// //                           </Typography>
// //                         </MenuItem>
// //                       </Link>
// //                       <MenuItem
// //                         key="Logout"
// //                         onClick={() => dispatch(logoutUser())}
// //                       >
// //                         <Typography textAlign="center">Logout</Typography>
// //                       </MenuItem>
// //                     </>
// //                   ))}
// //                 </Menu>
// //               </Box>
// //               <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //           <div className="flex">

// //             <Link
// //               href={"/papapet/auth"}
// //               className="max-md:hidden text-lg flex items-center justify-center gap-2"
// //             >
// //               Sign in
// //               <i className="ri-arrow-right-circle-fill text-lg"></i>
// //             </Link>
// //             {/* <PhantomConnect/> */}
// //           </div>
          
            
            
// //             <div
// //               className="w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2 
// //              bg-[#FFAD22] rounded-full flex items-end justify-center gap-[2vw]  
// //              max-md:w-[60vw] max-md:h-[60vw] max-md:absolute max-md:translate-x-10
// //              max-md:-right-[120%] max-md:-top-[150%] max-md:-z-20 max-md:px-3 max-md:pb-[16vw] max-md:pr-[17vw]"
// //             >
// //               {/* Search Icon */}
// //               <button
// //                 className="max-md:relative max-md:z-40   hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300 
// //                      max-md:hover:bg-white max-md:hover:text-[#0D9899] "
// //               >
// //                 <i className="ri-search-line"></i>
// //               </button>

// //               {/* Menu Icon */}
// //               <button
// //                 className="max-md:relative max-md:z-40  hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300 
// //                      max-md:hover:bg-white max-md:hover:text-[#0D9899] "
// //               >
// //                 <i className="ri-menu-2-line"></i>
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavPapaPet;

// }