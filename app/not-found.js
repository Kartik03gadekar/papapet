"use clinet"
import Link from 'next/link'
import React from 'react'

const NotFound =() => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black px-4">
    
    {/* Main Error Content */}
    <div className="flex flex-col items-center text-center max-w-xl">
        <h1 className="text-3xl font-semibold text-black mb-2 max-md:text-2xl">
          Oops! Something went wrong. <span className="inline-block">🐾</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg max-md:text-base">
          It looks like the page you’re looking for isn’t here.
        </p>
        <img
          src="/errorpageimg.png" // Replace with your cat img path
          alt="404"
         
          className="mb-8 max-md:w-[200px] h-auto w-[40vw]"
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
