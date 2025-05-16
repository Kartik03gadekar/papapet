// "use client";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "@/store/Action/auth";
// import { useRouter } from "next/navigation";

// const Login = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const target = e.target;
//     const formData = new FormData();
//     formData.append("phone", target.phone.value);

//     dispatch(loginUser(formData));
//     router.push("/mediensure/verifyauth");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full">
//       <div className="flex flex-col gap-1">
//         <label className="text-sm text-gray-600">Phone Number</label>
//         <input
//           type="tel"
//           name="phone"
//           placeholder="+91 - 9876543201"
//           className="border rounded-lg px-3 py-2 w-full  outline-none"
//           required
//         />
//       </div>

//       <button type="submit" className="bg-teal-500 w-full text-white font-bold py-2 rounded-md mt-4">
//         Continue
//       </button>
//     </form>
//   );
// };

// export default Login;

"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [useOTP, setUseOTP] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();

    if (useOTP) {
      formData.append("phone", target.phone.value);
      // Ideally handle OTP login flow here
    } else {
      formData.append("email", target.email.value);
      formData.append("password", target.password.value);
    }

    dispatch(loginUser(formData));
    router.push("/mediensure/verifyauth");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {!useOTP ? (
        <>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="border rounded-lg px-3 py-2 w-full outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="border rounded-lg px-3 py-2 w-full outline-none"
              required
            />
          </div>

          <div className="text-right text-sm text-green-500 cursor-pointer mb-3">
            Forgot Password?
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 - 9876543210"
            className="border rounded-lg px-3 py-2 w-full outline-none"
            required
          />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={useOTP}
          onChange={() => setUseOTP(!useOTP)}
          className="accent-teal-500"
        />
        <label className="text-sm text-gray-700">Login with OTP instead of password</label>
      </div>

      <button
        type="submit"
        className="bg-teal-500 w-full text-white font-bold py-2 rounded-md"
      >
        {useOTP ? "Send OTP" : "Login"}
      </button>
    </form>
  );
};

export default Login;
