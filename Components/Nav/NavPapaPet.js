// "use client"

// import React, { useEffect, useRef, useState } from "react";

// import gsap from "gsap";
// import {
//   Avatar,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import Link from "next/link";
// import PhantomConnect from "../WalletProvider";

// const NavPapaPet = () => {
//   const [showNavbar, setShowNavbar] = useState(true);
//   const prevScrollY = useRef(0);
//   const circle = useRef(null);
//   const mobileCircle  = useRef(null)
//   const [user, setUser] = useState(null);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [menuVisible, setMenuVisible] = useState(false);
//   const mobileMenuRef = useRef(null);

//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const settings = [
//     {
//       name: "Profile",
//       link: "/papapet/dashboard",
//     },
//   ];

//   const openMenu = () => {
//     setMenuVisible(true);
//     setMobileMenuOpen(true);
//   };

//   const closeMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//         setMenuVisible(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY === 0) {
//         // At top: animate circle closer to screen
//         gsap.to(circle.current, { top: "-210%", duration: 1 });
//         setShowNavbar(true);
//       } else if (currentScrollY > prevScrollY.current) {
//         // Scrolling down
//         if (currentScrollY > 100) {
//           setShowNavbar(false);
//           gsap.to(circle.current, { top: "-400%", duration: 0.8 });
//         }
//       } else {
//         // Scrolling up
//         setShowNavbar(true);
//         gsap.to(circle.current, { top: "-210%", duration: 0.8 });
//       }

//       prevScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//  useEffect(() => {
//     if (mobileMenuOpen && mobileMenuRef.current) {
//       gsap.fromTo(
//         mobileMenuRef.current,
//         { y: "-100%", opacity: 0 },
//         { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
//       );
//     } else if (!mobileMenuOpen && mobileMenuRef.current) {
//       gsap.to(mobileMenuRef.current, {
//         y: "-100%",
//         opacity: 0,
//         duration: 0.4,
//         ease: "power2.in",
//         onComplete: () => setMenuVisible(false),
//       });
//     }
//   }, [mobileMenuOpen]);

//  useEffect(() => {
//   const handleScroll = () => {
//     const currentScrollY = window.scrollY;
//     if (!mobileCircle.current) return;

//     const isMobile = window.innerWidth < 768;
//     if (!isMobile) return;

//     if (currentScrollY > prevScrollY.current) {
//       // Scroll Down → move up (hide)
//       gsap.from(mobileCircle.current, {
//         y: "-200%", // translateY upward
//         duration: 0.6,
//         ease: "power2.out",
//       });
//     } else {
//       // Scroll Up → move back (show)
//       gsap.to(mobileCircle.current, {
//         y: "0%",
//         duration: 0.6,
//         ease: "power2.out",
//       });
//     }

//     prevScrollY.current = currentScrollY;
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

//   return (
//     <>
//       <div
//         className={`w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16 justify-between p-5 flex-col
//         transition-transform duration-300 max-md:px-5 ${
//           showNavbar ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="w-full flex items-center justify-between pb-2">
//           <Link href="/">
//             <div className="flex items-center justify-center gap-2">
//               <img className="object-contain h-10" src="/logo.png" alt="logo" />
//               <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
//             </div>
//           </Link>
//           <div className="flex items-center justify-center gap-7 relative z-20 max-md:hidden">
//             <Link href="/">Home</Link>
//             <Link href="/">Services</Link>
//             <Link href="/">Pet Supplies</Link>
//             <Link href="/">Blogs</Link>
//             <Link href="/">About Us</Link>
//           </div>

//           {user ? (
//             <div className="flex items-center justify-center gap-2">
//               <Box sx={{ flexGrow: 0 }}>
//                 <Tooltip title="Open settings">
//                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                     <Avatar
//                       alt="User Avatar"
//                       src="/static/images/avatar/2.jpg"
//                     />
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   sx={{ mt: "45px" }}
//                   id="menu-appbar"
//                   anchorEl={anchorElUser}
//                   anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                   keepMounted
//                   transformOrigin={{ vertical: "top", horizontal: "right" }}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                 >
//                   {settings.map((setting) => (
//                     <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
//                       <Link href={setting.link}>
//                         <Typography textAlign="center">
//                           {setting.name}
//                         </Typography>
//                       </Link>
//                     </MenuItem>
//                   ))}
//                   <MenuItem key="Logout" onClick={() => setUser(null)}>
//                     <Typography textAlign="center">Logout</Typography>
//                   </MenuItem>
//                 </Menu>
//               </Box>
//               <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
//             </div>
//           ) : (
//             <div className="flex">
//               <Link
//                 href="/papapet/auth"
//                 className="max-md:hidden text-lg flex items-center justify-center gap-2"
//               >
//                 Sign in
//                 <i className="ri-arrow-right-circle-fill text-lg"></i>
//               </Link>

//             </div>
//           )}
//         </div>

//         <div
//           ref={circle}
//           className="desktop w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2
//              bg-[#FFAD22] rounded-full flex items-center justify-center gap-[2vw]"
//         >
//           <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D9899]">
//             <i className="ri-search-line"></i>
//           </button>
//           <button className="text-2xl text-white font-light px-3 py-1 rounded-full transition-all duration-300 hover:bg-white hover:text-[#0D9899]">
//             <i className="ri-menu-2-line"></i>
//           </button>
//         </div>

//         <div
//          ref={mobileCircle}
//           className=" md:hidden mobile absolute -top-[35vw] -right-[25vw] w-[60vw] h-[60vw] bg-[#FFAD22] rounded-full
//   flex items-center justify-center gap-6 z-10 pr-20 pt-[30%]   "
//         >
//           <div className= "flex items-center gap-4 vsmall">
//             <button className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300">
//               <i className="ri-search-line"></i>
//             </button>
//             <button
//               onClick={openMenu}
//               className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300"
//             >
//               <i className="ri-menu-4-fill"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {menuVisible && (
//         <div
//           ref={mobileMenuRef}
//           className="fixed inset-0 z-50 bg-white text-black flex flex-col p-6 gap-6 w-full h-full md:hidden"
//         >
//           <div className="flex justify-between items-center">
//             <div className="flex  gap-4 items-center">
//              <img className="object-contain h-10" src="/logo.png" alt="logo" />
//             <h2 className="text-3xl font-bold text-[#0D9899]">PaPaPet</h2>
//             </div>
//             <button onClick={closeMenu}>
//               <i className="ri-close-line text-3xl text-gray-600"></i>
//             </button>
//           </div>

//           <div className="flex flex-col gap-4 mt-4">
//             <button className="bg-[#8B5CF6] text-white px-4 py-2 rounded-full">
//               Connect Phantom Wallet
//             </button>
//             <Link
//               href="/papapet/auth"
//               onClick={closeMenu}
//               className="bg-[#FFAD22] text-white px-4 py-2 rounded-full text-center"
//             >
//               Sign In / Sign Up
//             </Link>

//             <hr className="border-gray-300" />

//             <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
//               Home
//             </Link>
//             <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
//               Services
//             </Link>
//             <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
//               Pet Supplies
//             </Link>
//             <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
//               Blogs
//             </Link>
//             <Link href="/" onClick={closeMenu}  className="text-2xl mb-2"  >
//               About Us
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavPapaPet;

// // {

// //   // "use client";
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import Link from "next/link";
// // // import gsap from "gsap";
// // // import { checkUser, logoutUser } from "@/store/Action/auth";
// // // import {
// // //   Avatar,
// // //   Box,
// // //   IconButton,
// // //   Menu,
// // //   MenuItem,
// // //   Tooltip,
// // //   Typography,
// // // } from "@mui/material";
// // // import PhantomConnect from "../WalletProvider";

// // // const NavPapaPet = () => {
// // //   const [showNavbar, setShowNavbar] = useState(true);
// // //   const prevScrollY = useRef(0);
// // //   const circle = useRef(null);
// // //   const { user } = useSelector((state) => state.auth);

// // //   const [anchorElNav, setAnchorElNav] = useState(null);
// // //   const [anchorElUser, setAnchorElUser] = useState(null);
// // //   const { loading, message } = useSelector((state) => state.auth);
// // //   useEffect(() => {}, [loading, message]);
// // //   const dispatch = useDispatch();
// // //   const handleOpenNavMenu = (event) => {
// // //     setAnchorElNav(event.currentTarget);
// // //   };
// // //   const handleOpenUserMenu = (event) => {
// // //     setAnchorElUser(event.currentTarget);
// // //   };

// // //   const handleCloseNavMenu = () => {
// // //     setAnchorElNav(null);
// // //   };
// // //   const settings = [
// // //     {
// // //       name: "Profile",
// // //       link: "/papapet/dashboard",
// // //     },
// // //   ];
// // //   const handleCloseUserMenu = () => {
// // //     setAnchorElUser(null);
// // //   };
// // //   useEffect(() => {
// // //     dispatch(checkUser());
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       const currentScrollY = window.scrollY;
// // //       if (currentScrollY === 0) {
// // //         gsap.to(circle.current, {
// // //           top: "-300%",
// // //           duration: 1,
// // //         });
// // //       }
// // //       if (currentScrollY > prevScrollY.current && currentScrollY > 20) {
// // //         gsap.to(circle.current, {
// // //           top: "-400%",
// // //           // opacity: 0,
// // //           duration: 0.5,
// // //         });
// // //         setShowNavbar(false); // Hide navbar on scroll down
// // //       }
// // //       if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
// // //         setShowNavbar(false); // Hide navbar on scroll down
// // //       } else {
// // //         setShowNavbar(true); // Show navbar on scroll up
// // //       }
// // //       prevScrollY.current = currentScrollY;
// // //     };

// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => {
// // //       window.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, []);

// // //   return (
// // //     <div
// // //       className={` w-full fixed top-0 left-0 z-40 font-semibold text-black flex items-center px-16   justify-between p-5 flex-col
// // //         transition-transform duration-300 max-md:px-5 ${
// // //         showNavbar ? "translate-y-0" : "-translate-y-full"
// // //       }`}
// // //     >
// // //       <div className="w-full flex items-center justify-between pb-2">
// // //              <Link href={"/"}>
// // //         <div className="flex items-center justify-center gap-2">

// // //           <img className="object-contain h-10" src="/logo.png" alt="logo" />
// // //           <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>

// // //         </div>
// // //         </Link>
// // //         <div className="flex items-center justify-center gap-7 relative z-20 max-md:hidden">
// // //           <Link href={"/"}>Home</Link>
// // //           <Link href={"/"}>Services</Link>
// // //           <Link href={"/"}>Pet Supplies</Link>
// // //           <Link href={"/"}>Blogs</Link>
// // //           <Link href={"/"}>About Us</Link>
// // //         </div>

// // //         {user ? (
// // //           <>
// // //             <div className="flex items-center justify-center gap-2">

// // //               <Box sx={{ flexGrow: 0 }}>
// // //                 <Tooltip title="Open settings">
// // //                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// // //                     <Avatar
// // //                       alt="Remy Sharp"
// // //                       src="/static/images/avatar/2.jpg"
// // //                     />
// // //                   </IconButton>
// // //                 </Tooltip>
// // //                 <Menu
// // //                   sx={{ mt: "45px" }}
// // //                   id="menu-appbar"
// // //                   anchorEl={anchorElUser}
// // //                   anchorOrigin={{
// // //                     vertical: "top",
// // //                     horizontal: "right",
// // //                   }}
// // //                   keepMounted
// // //                   transformOrigin={{
// // //                     vertical: "top",
// // //                     horizontal: "right",
// // //                   }}
// // //                   open={Boolean(anchorElUser)}
// // //                   onClose={handleCloseUserMenu}
// // //                 >
// // //                   {settings.map((setting) => (
// // //                     <>
// // //                       <Link href={`${setting.link}`}>
// // //                         <MenuItem
// // //                           key={setting.name}
// // //                           onClick={handleCloseUserMenu}
// // //                         >
// // //                           <Typography textAlign="center">
// // //                             {setting.name}
// // //                           </Typography>
// // //                         </MenuItem>
// // //                       </Link>
// // //                       <MenuItem
// // //                         key="Logout"
// // //                         onClick={() => dispatch(logoutUser())}
// // //                       >
// // //                         <Typography textAlign="center">Logout</Typography>
// // //                       </MenuItem>
// // //                     </>
// // //                   ))}
// // //                 </Menu>
// // //               </Box>
// // //               <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
// // //             </div>
// // //           </>
// // //         ) : (
// // //           <>
// // //           <div className="flex">

// // //             <Link
// // //               href={"/papapet/auth"}
// // //               className="max-md:hidden text-lg flex items-center justify-center gap-2"
// // //             >
// // //               Sign in
// // //               <i className="ri-arrow-right-circle-fill text-lg"></i>
// // //             </Link>
// // //             {/* <PhantomConnect/> */}
// // //           </div>

// // //             <div
// // //               className="w-[20vw] h-[20vw] absolute -top-[210%] left-1/2 -translate-x-1/2
// // //              bg-[#FFAD22] rounded-full flex items-end justify-center gap-[2vw]
// // //              max-md:w-[60vw] max-md:h-[60vw] max-md:absolute max-md:translate-x-10
// // //              max-md:-right-[120%] max-md:-top-[150%] max-md:-z-20 max-md:px-3 max-md:pb-[16vw] max-md:pr-[17vw]"
// // //             >
// // //               {/* Search Icon */}
// // //               <button
// // //                 className="max-md:relative max-md:z-40   hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300
// // //                      max-md:hover:bg-white max-md:hover:text-[#0D9899] "
// // //               >
// // //                 <i className="ri-search-line"></i>
// // //               </button>

// // //               {/* Menu Icon */}
// // //               <button
// // //                 className="max-md:relative max-md:z-40  hidden max-md:flex max-md:text-2xl max-md:text-white max-md:font-light max-md:px-3 max-md:py-1 max-md:rounded-full max-md:transition-all max-md:duration-300
// // //                      max-md:hover:bg-white max-md:hover:text-[#0D9899] "
// // //               >
// // //                 <i className="ri-menu-2-line"></i>
// // //               </button>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NavPapaPet;

// // }

"use client";

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
import { useRouter } from "next/navigation";
import PhantomConnect from "../WalletProvider";
import { checkUser, logoutUser } from "@/store/Action/auth"; // <-- import logoutUser
import { useDispatch, useSelector } from "react-redux";
import Search from "@/Components/Search/Search";

const NavPapaPet = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollY = useRef(0);
  const circle = useRef(null);
  const mobileCircle = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const mobileMenuRef = useRef(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.auth);
// console.log(user);

  const dispatch = useDispatch();
  const router = useRouter();

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
    // Only run if not authenticated AND we haven't checked before
    if (
      !isAuthenticated &&
      !sessionStorage.getItem("userChecked") &&
      localStorage.getItem("persist:auth")
    ) {
      sessionStorage.setItem("userChecked", "true");
      dispatch(checkUser());
    }
  }, [dispatch, isAuthenticated]);

  // Animate desktop orange circle on scroll, keep mobile static
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const isMobile = window.innerWidth < 768;

  //     if (!circle.current) return;

  //     if (!isMobile) {
  //       // Desktop: move the orange circle up on scroll down, down on scroll up
  //       if (currentScrollY === 0 || currentScrollY < prevScrollY.current) {
  //         // Show the orange circle (move down to original position)
  //         gsap.to(circle.current, { y: "0%", duration: 0.6 });
  //       } else if (currentScrollY > prevScrollY.current) {
  //         // Hide the orange circle (move up)
  //         gsap.to(circle.current, { y: "-100%", duration: 0.8 });
  //       }
  //     }
  //     // On mobile, do nothing (static)

  //     prevScrollY.current = currentScrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else if (!mobileMenuOpen && mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setMenuVisible(false),
      });
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    console.log("Attempting to log out...");
    try {
      await dispatch(logoutUser());
      console.log("Logout dispatched. Checking user state...");
      setTimeout(() => {
        // You may want to check the user state here if available
        if (!user) {
          console.log("User is successfully logged out.");
        } else {
          console.log("User is still present after logout attempt:", user);
        }
      }, 500);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handler for cart icon click
  const handleCartClick = () => {
    router.push("/papapet/cart");
  };

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleNavbarScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleNavbarScroll);
    return () => window.removeEventListener("scroll", handleNavbarScroll);
  }, []);

  return (
    <>
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div
        className={`h-auto w-full  top-0 left-0 z-40 font-semibold text-black flex items-center px-14 justify-between p-5 flex-col bg-white
           max-md:px-5 transition-transform duration-500 ease-in-out overflow-visible `}
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <img className="object-contain h-10" src="/logo.png" alt="logo" />
              <h1 className="text-2xl font-semibold text-[#0D9899]">PaPaPet</h1>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-5 relative z-20 max-md:hidden">
            <Link href="/">Home</Link>
            <Link href="/">Services</Link>
            <Link href="/">Pet Supplies</Link>
            <Link href="/">Blogs</Link>
            <Link href="/">About Us</Link>
          </div>

          {/* Desktop right controls: search, cart, user (no hamburger menu on desktop) */}
          <div className="flex items-center">
            {/* Desktop Search Icon */}
            <button
              className="text-2xl p-2 text-[#0D9899] rounded-full transition-all duration-300"
              onClick={() => {
                if (user) {
                  setSearchOpen(true); // ✅ Only opens if logged in
                } else {
                  router.push("/papapet/auth"); // 🚀 Redirect to login page
                }
              }}
              aria-label="Open search"
              type="button"
            >
              <i className="ri-search-line"></i>
            </button>

            {/* Desktop Cart Icon */}
            {user && (
              <button
                className="hidden md:flex text-2xl text-[#0D9899] p-2 rounded-full transition-all duration-300"
                onClick={handleCartClick}
                aria-label="Open cart"
                type="button"
              >
                <i className="ri-shopping-cart-2-line"></i>
              </button>
            )}
            {user ? (
              <div className="flex items-center justify-center gap-2 max-md:hidden">
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
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Link href={setting.link}>
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem
                      key="Logout"
                      onClick={() => {
                        handleLogout();
                        handleCloseUserMenu();
                      }}
                    >
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
              </div>
            )}
          </div>
        </div>

        <div
          ref={circle}
          className="desktop w-[17vw] h-[17vw] absolute -top-[250%] left-1/2 -translate-x-1/2 
             bg-[#FFAD22] rounded-full flex items-center justify-center gap-[2vw]"
        ></div>

        <div
          ref={mobileCircle}
          className="md:hidden mobile absolute -top-[38vw] -right-[25vw] w-[60vw] h-[60vw] bg-[#FFAD22] rounded-full 
  flex items-center justify-center gap-6 z-10 pr-20 pt-[35%]"
        >
          <div className="flex items-center pl-3">
            <button
              className="text-white text-2xl p-2  hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300"
              onClick={() => {
                if (user) {
                  setSearchOpen(true); // ✅ Only opens if logged in
                } else {
                  router.push("/papapet/auth"); // 🚀 Redirect to login page
                }
              }}
              aria-label="Open search"
              type="button"
            >
              <i className="ri-search-line"></i>
            </button>

            {/* Mobile Cart Icon */}
            {user && (
              <button
                className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300"
                onClick={handleCartClick}
                aria-label="Open cart"
                type="button"
              >
                <i className="ri-shopping-cart-2-line"></i>
              </button>
            )}
            <button
              onClick={openMenu}
              className="text-white text-2xl p-2 hover:bg-white hover:text-[#0D9899] rounded-full transition-all duration-300"
              aria-label="Open menu"
              type="button"
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
            <div className="flex gap-4 items-center">
              <img className="object-contain h-10" src="/logo.png" alt="logo" />
              <h2 className="text-3xl font-bold text-[#0D9899]">PaPaPet</h2>
            </div>
            <button onClick={closeMenu}>
              <i className="ri-close-line text-3xl text-gray-600"></i>
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl">
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              <div className="flex flex-col">
                <span className="text-lg font-medium">Hi, {user?.name}</span>
              </div>
            </div>
          ) : (
            <Link
              href="/papapet/auth"
              onClick={closeMenu}
              className="bg-[#FFAD22] text-white px-4 py-2 rounded-full text-center"
            >
              Sign In / Sign Up
            </Link>
          )}
          <div className="flex flex-col gap-4">
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-center text-white rounded-full px-4 py-2 bg-[#FFB828]"
              >
                Logout
              </button>
            )}

            <hr className="border-gray-300" />

            <Link href="/" onClick={closeMenu} className="text-2xl mb-2">
              Home
            </Link>
            {user && (
              <Link
                href="/papapet/dashboard"
                className="text-2xl mb-2"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            <Link href="/" onClick={closeMenu} className="text-2xl mb-2">
              Services
            </Link>
            <Link href="/" onClick={closeMenu} className="text-2xl mb-2">
              Pet Supplies
            </Link>
            <Link href="/" onClick={closeMenu} className="text-2xl mb-2">
              Blogs
            </Link>
            <Link href="/" onClick={closeMenu} className="text-2xl mb-2">
              About Us
            </Link>
            <Link
              href="/papapet/termsandconditions"
              onClick={closeMenu}
              className="text-2xl mb-2"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/papapet/privacy-policy"
              onClick={closeMenu}
              className="text-2xl mb-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/papapet/cancellation-refund"
              onClick={closeMenu}
              className="text-2xl mb-2"
            >
              Cancellation and Refund
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavPapaPet;
