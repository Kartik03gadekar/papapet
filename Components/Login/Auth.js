"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // ✅ Check user status on page load
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (loading) return; // wait until auth check is done
if (!isAuthenticated) {
      router.replace("/papapet/auth"); // go to auth if  not logged in
    }
    if (isAuthenticated) {
      router.replace("/"); // go to home if logged in
    }
  }, [isAuthenticated, loading, router]);

  // ✅ Optional: loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <img src="/logo.png" alt="Logo" className="h-10 mb-2 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Please enter your details
          </p>

          <div className="flex justify-center space-x-2 w-full mb-6">
            <button
              onClick={() => setIsSignup(false)}
              className={`py-1 px-6 rounded-full font-semibold transition ${
                !isSignup
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`py-1 px-6 rounded-full font-semibold transition ${
                isSignup
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isSignup ? <Register /> : <Login />}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2">
        <img
          src="/authImage.png"
          className="w-full h-full object-cover"
          alt="Auth Background"
        />
      </div>
    </div>
  );
};

export default Auth;
