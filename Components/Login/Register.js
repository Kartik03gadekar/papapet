"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/Action/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/Firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // npm install js-cookie

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => console.log("Recaptcha solved"),
        "expired-callback": () => {
          toast.warn("reCAPTCHA expired. Please try sending the OTP again.");
        },
      }
    );

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  // Send OTP
  const handleSendOtp = async () => {
    if (!/^[0-9]{10}$/.test(formValues.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const verifier = window.recaptchaVerifier;
      const e164Phone = `+91${formValues.phone}`;
      const result = await signInWithPhoneNumber(auth, e164Phone, verifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success(`OTP sent to ${e164Phone}`);
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and register user
  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) {
      toast.error("Enter the OTP");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);

      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== "confirmPassword") formData.append(key, value);
      });

      const payload = {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        password: formValues.password,
      };

      const response = await dispatch(registerUser(payload));

      const token = response?.payload?.token;
      if (token) {
        Cookies.set("token", token, { expires: 7 });
      }

      toast.success("Registration successful");
      router.push("/");
    } catch (error) {
      console.error("OTP verify error:", error);
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          otpSent ? handleVerifyOtp() : handleSendOtp();
        }}
        className="w-full"
      >
        {!otpSent && (
          <>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Create Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full outline-none"
                required
              />
            </div>
          </>
        )}

        {otpSent && (
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm text-gray-600">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="border rounded-lg px-3 py-2 w-full outline-none"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-500 w-full text-white font-bold py-2 rounded-md mt-4"
        >
          {otpSent ? "Verify OTP & Register" : "Send OTP"}
        </button>

        <div id="recaptcha-container"></div>
      </form>
    </>
  );
};

export default Register;

// "use client";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "@/store/Action/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth } from "@/Firebase/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { useRouter } from "next/navigation";

// const Register = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Setup Recaptcha
//   const setupRecaptcha = () => {
//     if (window.recaptchaVerifier) {
//       window.recaptchaVerifier.clear();
//       window.recaptchaVerifier = null;
//     }
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => console.log("Recaptcha verified"),
//         "expired-callback": () => console.warn("Recaptcha expired"),
//       }
//     );
//     return window.recaptchaVerifier;
//   };

//   // Send OTP
//   const handleSendOtp = async () => {
//     if (!/^[0-9]{10}$/.test(formValues.phone)) {
//       toast.error("Enter a valid 10-digit phone number");
//       return;
//     }
//     if (formValues.password !== formValues.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const verifier = setupRecaptcha();
//       const e164Phone = `+91${formValues.phone}`;
//       const result = await signInWithPhoneNumber(auth, e164Phone, verifier);
//       setConfirmationResult(result);
//       setOtpSent(true);
//       toast.success(`OTP sent to ${e164Phone}`);
//     } catch (error) {
//       console.error("OTP send error:", error);
//       toast.error(error.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP and register user
//   const handleVerifyOtp = async () => {
//     if (!otp || !confirmationResult) {
//       toast.error("Enter the OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       await confirmationResult.confirm(otp);

//       const formData = new FormData();
//       Object.entries(formValues).forEach(([key, value]) => {
//         if (key !== "confirmPassword") formData.append(key, value);
//       });

//       await dispatch(registerUser(formData));
//       toast.success("Registration successful");
//       router.push("/papapet/auth");
//     } catch (error) {
//       console.error("OTP verify error:", error);
//       toast.error("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           otpSent ? handleVerifyOtp() : handleSendOtp();
//         }}
//         className="w-full"
//       >
//         {!otpSent && (
//           <>
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formValues.name}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm text-gray-600">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formValues.email}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm text-gray-600">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formValues.phone}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm text-gray-600">Create Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formValues.password}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label className="text-sm text-gray-600">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formValues.confirmPassword}
//                 onChange={handleChange}
//                 className="border rounded-lg px-3 py-2 w-full outline-none"
//                 required
//               />
//             </div>
//           </>
//         )}

//         {otpSent && (
//           <div className="flex flex-col gap-1 mb-4">
//             <label className="text-sm text-gray-600">Enter OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="6-digit OTP"
//               className="border rounded-lg px-3 py-2 w-full outline-none"
//               required
//             />
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-teal-500 w-full text-white font-bold py-2 rounded-md mt-4"
//         >
//           {otpSent ? "Verify OTP & Register" : "Send OTP"}
//         </button>

//         <div id="recaptcha-container"></div>
//       </form>
//     </>
//   );
// };

// export default Register;
