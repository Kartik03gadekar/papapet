'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import React from 'react'

const page = () => {
    const [phone, setPhone] = useState('');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full md:max-w-md border border-gray-200">
      <div className="flex flex-col items-center">
        <Image src="/logo.png" alt="PaPaPet Logo" width={50} height={50} />
        <h1 className="text-2xl font-semibold mt-4">Welcome Back</h1>
        <p className="text-gray-500 text-sm">Welcome back, Please enter your details</p>
      </div>

      <div className="flex mt-6 space-x-4">
        <button className="flex-1 py-2 text-white bg-black rounded-lg">Sign in</button>
        <button className="flex-1 py-2 text-black bg-gray-200 rounded-lg">Sign up</button>
      </div>

      <div className="mt-6">
        <label className="block text-gray-600 text-sm">Phone Number</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
          <span className="text-gray-600">+91 -</span>
          <input
            type="tel"
            className="flex-1 outline-none px-2"
            placeholder="98765433201"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className="text-green-500">✔</span>
        </div>
      </div>


      <button className="w-full mt-6 bg-teal-500 text-white py-2 rounded-lg">Continue</button>

      <p className="text-center text-gray-500 text-sm mt-4">Or Continue With</p>

      <div className="flex justify-center space-x-4 mt-3">
        <FaGoogle className="text-red-500 text-2xl cursor-pointer" />
        <FaApple className="text-black text-2xl cursor-pointer" />
        <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
      </div>
    </div>

    <div className="mt-8 max-md:hidden">
      <Image src="/dog-owner.jpg" alt="Dog and owner" width={300} height={200} className="rounded-lg" />
    </div>
  </div>
  )
}

export default page
