"use client";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; // ✅ new package

const Loader = () => {
  const messages = [
    "🐶 Fetching your content… almost there!",
    "🐱 Purring softly while we load your page",
    "🐕 Sit, stay… loading in progress",
    "💤 Our cat took a quick nap, loading soon",
    "🦴 Burying bugs, digging up data",
    "🐾 Chasing the loading bar like a laser pointer",
    "🐶 Wagging tails while we load",
    "🐱 Nine lives, one loading screen",
    "🐕 Sniffing out the best results for you",
    "🧶 Untangling some yarns of code",
  ];

  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="fixed bottom-2 right-1 md:bottom-5 md:right-5 bg-white z-[9999]">
        <DotLottieReact
          src="/loaders/pageloader.lottie"
          autoplay
          loop
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div className="flex items-center justify-center h-screen w-full">
        <h1 className="font-bold">{message}</h1>
      </div>
    </div>
  );
};

export default Loader;
