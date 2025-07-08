"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePage } from "@/store/Action/others";
import { io } from "socket.io-client";
import PhantomConnect from "@/Components/WalletProvider";
let socket;
const getSocket = () => {   
  if (!socket) {
    // socket = io("http://localhost:5001/", { path: "/socket.io" });
    // socket = io("https://api.mycozee.in/", {
    //   path: "/socket.io",
    // });
     socket = io("https://papapetbackend-1.onrender.com/api/v1/", {
      path: "/socket.io",
    });
  }
  return socket;
};

// Dynamically import heavy components for performance optimization
const NavPapaPet = dynamic(() => import("@/Components/Nav/NavPapaPet"), {
  ssr: false,
});
const HomePage = dynamic(() => import("@/Components/HomePage/HomePage"), {
  ssr: false,
});
const Page2 = dynamic(() => import("@/Components/Page2/Page2"), { ssr: false });

const Page3 = dynamic(() => import("@/Components/Page3/Page3"), { ssr: false });

const Page4 = dynamic(() => import("@/Components/Page4/Page4"), { ssr: false });

const Page5 = dynamic(() => import("@/Components/Page5/Page5"), { ssr: false });
const Page6= dynamic(() => import("@/Components/Page6/Page6"),{ssr:false,});
const Footer = dynamic(() => import("@/Components/Footer/Footer"), {
  ssr: false,
});



const Page = () => {
  const dispatch = useDispatch();
  const { homepage, imgLink } = useSelector((state) => state.others);

  useEffect(() => {
    getSocket()
    dispatch(getHomePage());
  }, [dispatch]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("dataUpdate", (data) => {
      console.log("Received data from the server:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-white">
      <NavPapaPet />
      <HomePage />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6/>
      <Footer />
    </div>
  );
};

export default Page;
