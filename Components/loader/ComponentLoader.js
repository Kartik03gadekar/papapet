"use client";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; // ✅ new package

const ComponentLoader = () => {

  return (
    <div className="relative h-screen w-screen backdrop-blur-xl">
      <div className="h-full w-full flex items-center justify-center bg-transparent z-[9999]">
        <DotLottieReact
          src="/loaders/componentloader.lottie"
          autoplay
          loop
          style={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
};

export default ComponentLoader;
