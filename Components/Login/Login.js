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
import { auth } from "@/Firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [useOTP, setUseOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(""); // ✅ Always controlled
  const [phone, setPhone] = useState(""); // ✅ Always controlled
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Setup Recaptcha
  const setupRecaptcha = () => {
    if (typeof window === "undefined") return null;

    // ✅ Clear old verifier if exists
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, // ✅ auth first
      "recaptcha-container", // ✅ container second
      {
        size: "invisible",
        callback: () => console.log("Recaptcha solved"),
        "expired-callback": () => console.warn("Recaptcha expired"),
      }
    );

    // ✅ Must render
    window.recaptchaVerifier.render();
    return window.recaptchaVerifier;
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    const e164Phone = `+91${phone}`;

    try {
      setLoading(true);
      const verifier = setupRecaptcha();

      const result = await signInWithPhoneNumber(auth, e164Phone, verifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success(`OTP sent to ${e164Phone}`);
    } catch (error) {
      console.error("OTP Send Error:", error);
      toast.error(error.message || "Failed to send OTP. Check Firebase setup.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) {
      toast.error("Enter the OTP first");
      return;
    }

    try {
      setLoading(true);
      const result = await confirmationResult.confirm(otp);

      // Dispatch login to backend
      const formData = new FormData();
      formData.append("phone", result.user.phoneNumber.replace("+91", ""));
      await dispatch(loginUser(formData));

      // router.push("/mediensure/verifyauth");
      router.push("/")
    } catch (error) {
      console.error("OTP Verify Error:", error);
      toast.error("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;

    if (useOTP) {
      if (!otpSent) {
        await handleSendOtp();
      } else {
        await handleVerifyOtp();
      }
    } else {
      const formData = new FormData();
      formData.append("email", target.email.value);
      formData.append("password", target.password.value);

      await dispatch(loginUser(formData));
      router.push("/mediensure/verifyauth");
    }
  };

  return (
    <>
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

            <div className="text-right text-sm text-red-500 cursor-pointer mb-3">
              Forgot Password?
            </div>
          </>
        ) : (
          <>
            {/* Phone Number */}
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>

            {otpSent && (
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm text-gray-600">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  className="border rounded-lg px-3 py-2 w-full outline-none"
                  required
                />
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={useOTP}
            onChange={() => {
              setUseOTP(!useOTP);
              setOtpSent(false);
              setOtp("");
            }}
            className="accent-teal-500"
          />
          <label className="text-sm text-gray-700">
            Login with OTP instead of password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 w-full text-white font-bold py-2 rounded-md"
        >
          {useOTP ? (otpSent ? "Verify OTP" : "Send OTP") : "Login"}
        </button>

        <div id="recaptcha-container"></div>
      </form>
    </>
  );
};

export default Login;
