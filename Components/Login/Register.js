import { registerUser } from "@/store/Action/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    receiveOffers: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirm" && key !== "receiveOffers") {
        submissionData.append(key, value);
      }
    });

    dispatch(registerUser(submissionData));
  };

  return (
    <div className="h-[80vh] flex w-full bg-white">
      {/* Left Section - Image */}
      <div className="w-1/2 flex items-center justify-center">
        <img className="h-full w-full object-contain" src="/img.png" alt="Register" />
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="h-[72vh] w-96 bg-white rounded-lg shadow-2xl p-6 flex flex-col gap-4">
          {/* Name Input */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered border-2 w-full px-2 py-1"
              required
            />
          </div>

          {/* Mobile Number Input */}
          <div>
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered border-2 w-full px-2 py-1"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered border-2 w-full px-2 py-1"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="label">
              <span className="label-text">Create Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered border-2 w-full px-2 py-1"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              className="input input-bordered border-2 w-full px-2 py-1"
              required
            />
          </div>

          {/* Offers Checkbox */}
          <div className="form-control">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                name="receiveOffers"
                checked={formData.receiveOffers}
                onChange={handleChange}
                className="checkbox"
              />
              <span className="label-text pl-3 text-[#567237]">
                Receive relevant offers and promotional communication from MediEnsure
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-[#567237] w-full text-white font-bold py-2 rounded-md">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
