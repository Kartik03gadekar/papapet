// "use client";
// import { Image } from "antd";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Skeleton } from "@mui/material";
// import { checkUser } from "@/store/Action/auth";

// const Profile = ({user}) => {
//   const file = useRef(null);
//   const openfile = () => {
//     file.current.click();
//   };
//   const [name, setname] = useState("");
//   const [last, setLast] = useState("");
//   const [email, setemail] = useState("");
//   const [medicialName, setmedicialName] = useState("");
//   const [gst, setgst] = useState("");
//   const [address, setaddress] = useState("");
//   const [city, setcity] = useState("");
//   const [state, setstate] = useState("");
//   const [phone, setphone] = useState("");
//   const [pinCode, setpinCode] = useState("");
//   const dispatch = useDispatch();
//   const uploadImage = (e) => {
//     const myform = new FormData();
//     myform.set("avatar", e.target.files[0]);
//     dispatch(uploadAvatar(myform));
//   };

//   useEffect(() => {
//     if (user) {
//       setname(user?.name);
//       setLast(user?.lastname);
//       setemail(user?.email);
//       setphone(user?.phone);
//       setgst(user?.gst);
//       setmedicialName(user?.medicalName);
//       setpinCode(user?.pinCode);
//       setgst(user?.gst);
//       setphone(user?.phone);
//       setcity(user?.city);
//       setstate(user?.state);
//       setaddress(user?.address);
//     }
//   }, [user]);

//   const submitData = () => {
//     const info = {
//       firstname: name,
//       lastname: last,
//       email: email,
//       medicalName: medicialName,
//       phone: phone,
//       gst: gst,
//       address: address,
//       state: state,
//       city: city,
//       pinCode: pinCode,
//     };
//     if (
//       name &&
//       last &&
//       email &&
//       medicialName &&
//       phone &&
//       gst &&
//       address &&
//       state &&
//       city &&
//       pinCode
//     ) {
//       // dispatch(updateDetails(info));
//     } else {
//       toast.error("All details are required");
//     }
//   };
//   return (
//     <div className="w-full  min-h-full relative overflow-y-auto items-center justify-center flex">
//       <div className="h-full w-[30%] flex flex-col items-center justify-center mt-10 p-10">
//         {user?.avatar ? (
//           <Image
//             src={user?.avatar?.url}
//             width={"20vw"}
//             height={"20vw"}
//             style={{ borderRadius: "100%" }}
//           />
//         ) : (
//           <Skeleton variant="circular" width={"20vw"} height={"20vw"} />
//         )}

//         <div
//           onClick={openfile}
//           className="div flex items-center justify-center p-6 px-14 mt-10 gap-2 text-lg font-semibold text-blue-400 cursor-pointer border-dashed border-2 border-blue-300 bg-blue-100"
//         >
//           <i className="ri-upload-cloud-2-line"></i>
//           Upload Image
//           <input
//             type="file"
//             name="img"
//             accept=".png, .jpg, .jpeg .avif"
//             ref={file}
//             onChange={(e) => uploadImage(e)}
//             className="hidden"
//           />
//         </div>
//       </div>
//       <div className="h-full w-[70%] grid grid-cols-2 place-content-center place-items-center  gap-5 p-4 pt-10">
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Name</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             value={name}
//             onChange={(e) => setname(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>

//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Contact</span>
//           </label>
//           <input
//             type="number"
//             placeholder="Type here"
//             value={phone}
//             onChange={(e) => setphone(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Email</span>
//           </label>
//           <input
//             type="email"
//             placeholder="Type here"
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Age</span>
//           </label>
//           <input
//             type="number"
//             placeholder="Type here"
//             // value={pinCode}
//             // onChange={(e) => setpinCode(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Address</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             value={address}
//             onChange={(e) => setaddress(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">City</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             value={city}
//             onChange={(e) => setcity(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">State</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             value={state}
//             onChange={(e) => setstate(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <div className="flex flex-col items-start gap-4">
//           <label className="label">
//             <span className="label-text">Pin Code</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type here"
//             value={pinCode}
//             onChange={(e) => setpinCode(e.target.value)}
//             className="p-2 outline-none rounded-sm border-2 w-full max-w-xs"
//           />
//         </div>
//         <span></span>
//         <button
//           onClick={submitData}
//           className="p-4 px-14 rounded-lg bg-green-600 text-white ease-linear transition-all duration-300 hover:shadow-md hover:bg-green-700"
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";

const Profile = ({ user }) => {
  const file = useRef(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    secondaryEmail: "",
    phoneNumber: "",
    country: "",
    state: "",
    zipCode: "",
    address: "",
    landmark: "",
   
  });

  const openfile = () => {
    file.current.click();
  };

  const uploadImage = (e) => {
    const myform = new FormData();
    myform.set("avatar", e.target.files[0]);
    dispatch(uploadAvatar(myform));
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
        zipCode: user.pinCode || "",
        address: user.address || "",
        landmark: user.landmark || "",
        firstName: user.name || "",
      });
    }
  }, [user]);

  const submitData = () => {
    const { email, phoneNumber, address, state, city, zipCode } = formData;
    if (email && phoneNumber && address && state && zipCode) {
      const info = {
        email,
        phone: phoneNumber,
        address,
        state,
        zipCode,
      };
      // dispatch(updateDetails(info));
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

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
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
                  className="border rounded px-3 py-2 w-full"
                >
                  <option>Bangladesh</option>
                  <option>India</option>
                </select>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={submitData}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Save Changes
        </button>
      </section>

      <section className="w-full border rounded-md shadow-sm bg-white px-6 py-4">
        <h2 className="text-2xl font-semibold border-b pb-4 mb-6">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">Full Name</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="Email">Email</label>
              <input
                id="secondaryEmail"
                name="secondaryEmail"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div> <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded px-3 py-2 w-full"
            /></div>
            
                 <div> <label className="block text-sm font-medium mb-1" htmlFor="secondaryEmail">Secondary Email</label>
              <input
                id="secondaryEmail"
                name="secondaryEmail"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded px-3 py-2 w-full"
              /></div>
              
           
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option>Bangladesh</option>
                  <option>India</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="zipCode">Zip Code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full Address"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="landmark">Landmark (Optional)</label>
            <input
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="e.g., Near City Mall or Opposite Central Park"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
          Save Changes
        </button>
      </section>
    </div>
  );
};

export default Profile;