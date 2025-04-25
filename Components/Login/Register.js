"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/Action/auth";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();

    // Password match validation (copied from first version)
    if (target.password.value !== target.confirmPassword.value) {
      toast.error("Passwords do not match");
      return;
    }

    formData.append("name", target.name.value);
    formData.append("email", target.email.value);
    formData.append("phone", target.phone.value);
    formData.append("password", target.password.value);

    // Dispatch registration
    dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full ">
      <div className="flex flex-col ">
        <label className="text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          name="name"
          className="border rounded-lg px-3 py-2 w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          className="border rounded-lg px-3 py-2 w-full  outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-sm text-gray-600">Phone Number</label>
        <input
          type="tel"
          name="phone"
          className="border rounded-lg px-3 py-2 w-full  outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-sm text-gray-600">Create Password</label>
        <input
          type="password"
          name="password"
          className="border rounded-lg px-3 py-2 w-full  outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <label className="text-sm text-gray-600">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="border rounded-lg px-3 py-2 w-full  outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-teal-500 w-full text-white font-bold py-2 rounded-md mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
