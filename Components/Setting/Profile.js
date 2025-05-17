"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateDetails } from "@/store/Action/auth";

const Profile = ({ user }) => {
  console.log(user);
  
  const file = useRef(null);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    secondaryEmail: "",
    phoneNumber: "",
    country: "",
    state: "",
    zipcode: "",
    address: "",
    landmark: "",
  });

  const openfile = () => {
    file.current.click();
  };

  const uploadImage = (e) => {
    const myform = new FormData();
    myform.set("avatar", e.target.files[0]);
    dispatch(uploadAvatar(myform)); // You must ensure `uploadAvatar` is properly imported
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        secondaryEmail: user.secondaryEmail || "",
        phoneNumber: user.phone || "",
        country: user.country || "",
        state: user.state || "",
        zipcode: user.zipcode || "",
        address: user.address || "",
        landmark: user.landmark || "",
      });
    }
  }, [user, dispatch]);

  const submitData = () => {
    const {
      email,
      secondaryEmail,
      phoneNumber,
      address,
      state,
      country,
      zipcode,
      landmark,
    } = formData;

    if (email && phoneNumber) {
      const info = {
        email,
        secondaryEmail,
        phone: phoneNumber,
        address,
        state,
        country,
        zipcode,
        landmark,
      };
      dispatch(updateDetails(info));
      toast.success("Profile updated successfully!");
      setIsEditing(false); // turn off edit mode
    } else {
      toast.error("All details are required");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <section className="w-full py-4 mb-10 border rounded-md shadow-sm bg-white px-6">
        <h2 className="text-2xl font-semibold border-b pb-4 mb-6">Profile</h2>
        <div className="flex flex-col lg:flex-row gap-10 mb-10">
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar.url}
                alt="Avatar"
                className="w-[14vw] h-[14vw] object-cover rounded-full"
              />
            ) : (
              <Skeleton variant="circular" width="14vw" height="14vw" />
            )}

            <div
              onClick={openfile}
              className="mt-6 cursor-pointer px-4 py-3 bg-blue-100 text-blue-500 border-2 border-dashed border-blue-300 font-medium flex items-center gap-2"
            >
              <i className="ri-upload-cloud-2-line"></i>
              Upload Image
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .avif"
                ref={file}
                onChange={uploadImage}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex-1 grid grid-cols md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Secondary Email</label>
              <input
                name="secondaryEmail"
                type="email"
                value={formData.secondaryEmail}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Location Info</label>
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option>Bangladesh</option>
                  <option>India</option>
                </select>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="State"
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Pin Code"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border rounded-md shadow-sm bg-white px-6 py-4">
        <h2 className="text-2xl font-semibold border-b pb-4 mb-6">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Full Name"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secondary Email</label>
              <input
                name="secondaryEmail"
                value={formData.secondaryEmail}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Secondary Email"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Phone Number"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Email"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="border rounded px-3 py-2 w-full"
              >
                <option>Bangladesh</option>
                <option>India</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="State"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Zip Code"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Full Address"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
            <input
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="e.g., Near City Mall or Opposite Central Park"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Action Button */}
        {isEditing ? (
          <button
            onClick={submitData}
            className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </section>
    </div>
  );
};

export default Profile;
