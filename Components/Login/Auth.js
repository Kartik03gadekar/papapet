// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { checkUser } from "@/store/Action/auth";
// import { useRouter } from "next/navigation";
// import Login from "./Login";
// import Register from "./Register";

// const Auth = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     dispatch(checkUser());
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/mediensure/verifyauth");
//     }
//   }, [isAuthenticated]);

//   return (
//     <div className="h-screen w-full flex flex-col md:flex-row bg-gray-100 pt-[4vw]">
//       {/* Left Section (Form) */}
//       <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
//         <div className="w-full max-w-md">
//           <img src="/logo.png" alt="Logo" className="h-10 mb-2 mx-auto" />
//           <h2 className="text-2xl font-bold text-gray-800 text-center">
//             Welcome Back
//           </h2>
//           <p className="text-sm text-gray-500 text-center mb-4">
//             Please enter your details
//           </p>

//           <div className="flex justify-center space-x-2 w-full mb-6">
//             <button
//               onClick={() => setIsSignup(false)}
//               className={`py-1 px-6 rounded-full font-semibold transition ${
//                 !isSignup ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsSignup(true)}
//               className={`py-1 px-6 rounded-full font-semibold transition ${
//                 isSignup ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Render the appropriate form */}
//           {isSignup ? <Register /> : <Login />}

//           <p className="text-center text-gray-500 text-sm mt-2">Or Continue With</p>

//           {/* Social Login */}
//           <div className="flex justify-center mt-2 space-x-4">
//             <button className="p-2 bg-gray-200 rounded-full">
//               <img src="/google-icon.png" alt="Google" className="h-6 w-6" />
//             </button>
//             <button className="p-2 bg-gray-200 rounded-full">
//               <img src="/facebook-icon.png" alt="Facebook" className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Section (Image) */}
//       <div className="hidden md:block w-1/2">
//         <img src="/authImage.png" className="w-full h-full object-cover" alt="Auth Background" />
//       </div>
//     </div>
//   );
// };

// export default Auth;

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
  
  const { isAuthencticated } = useSelector((state) => state.auth);

  // Check user status on initial load
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthencticated === true) {
      router.push("/mediensure/verifyauth");
    }
  }, [isAuthencticated, router]);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row  pt-[4vw]">
      {/* Left Section (Form) */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <img src="/logo.png" alt="Logo" className="h-10 mb-2 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
          <p className="text-sm text-gray-500 text-center mb-4">Please enter your details</p>

          <div className="flex justify-center space-x-2 w-full mb-6">
            <button
              onClick={() => setIsSignup(false)}
              className={`py-1 px-6 rounded-full font-semibold transition ${
                !isSignup ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`py-1 px-6 rounded-full font-semibold transition ${
                isSignup ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isSignup ? <Register /> : <Login />}

         
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:block w-1/2">
        <img src="/authImage.png" className="w-full h-full object-cover" alt="Auth Background" />
      </div>
    </div>
  );
};

export default Auth;
