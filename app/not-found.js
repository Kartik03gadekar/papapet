"use client"
import Link from 'next/link'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound =() => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black px-4 overflow-hidden">
    
    {/* Main Error Content */}
    <div className="flex flex-col items-center text-center max-w-xl">
        <h1 className="text-3xl font-semibold text-black mb-2 max-md:text-2xl px-5">
          Oops! Something went wrong. <span className="inline-block">🐾</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg max-md:text-base">
          It looks like the page you’re looking for isn’t here.
        </p>
        <DotLottieReact
          src="/loaders/404cat.lottie"
          alt="404"
         autoplay
         loop
          className="mb-8 h-auto w-[500px]"
        />
        <Link
          href="/"
          className="bg-[#FFA500] hover:bg-[#FF8C00] text-white px-6 py-2 rounded-lg font-medium"
        >
          Go Back Home
        </Link>
      </div>
  </div>
  )
}

export default NotFound
