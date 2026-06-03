import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { Eye, EyeOff } from "lucide-react"; 

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const { name, email, password, confirmPassword } = signupInfo;
    
    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fields are required");
    }

    if (password !== confirmPassword) {
      return handleError("Password and Confirm Password do not match!");
    }

    try {
      const url = "https://authentication-mern-self.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-200 via-blue-200 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={signupInfo.name}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={signupInfo.email}
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password..."
                className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password..."
                className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-700 to-blue-300 hover:from-sky-700 hover:to-blue-400 transition duration-300 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Signup
          </button>

          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
