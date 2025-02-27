import { loginUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [useOtp, setUseOtp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData();
    formData.append("email", target.email.value);
    formData.append("password", target.password.value);

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      if (response.success) {
        router.push("/mediensure/verifyauth");
      } else {
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-[80vh] flex w-full bg-white">
      <div className="h-full w-full md:w-1/2 flex items-center justify-center">
        <img className="h-full w-full object-contain" src="/img.png" alt="Login" />
      </div>
      <div className="h-full w-full md:w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-96 bg-white rounded-lg shadow-2xl p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number/ Email ID</label>
            <input
              type="text"
              name="email"
              className="input input-bordered border-2 w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered border-2 w-full px-2 py-1"
            />
          </div>
          <h1 className="text-green-500 text-sm cursor-pointer hover:underline">Forgot Password?</h1>
          <div className="form-control flex items-center mt-3">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                checked={useOtp}
                onChange={() => setUseOtp(!useOtp)}
                className="checkbox"
              />
              <span className="ml-2 text-sm font-light">Login with OTP instead of password</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#567237] w-full mt-6 text-white font-bold py-2 rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

