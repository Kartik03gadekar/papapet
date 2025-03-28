"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();
    formData.append("phone", target.phone.value);

    dispatch(loginUser(formData));
    router.push("/mediensure/verifyauth");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="+91 - 9876543201"
          className="border rounded-lg px-3 py-2 w-full  outline-none"
          required
        />
      </div>

      <button type="submit" className="bg-teal-500 w-full text-white font-bold py-2 rounded-md mt-4">
        Continue
      </button>
    </form>
  );
};

export default Login;
