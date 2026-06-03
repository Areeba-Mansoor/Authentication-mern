import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

export const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   setLoggedInUser(localStorage.getItem("loggedInUser") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome</h1>

        <p className="text-gray-500 mb-6">You are successfully logged in</p>

        <div className="bg-gray-100 rounded-xl p-5 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Logged In User
          </p>
          <p className="text-xl font-semibold text-gray-800 mt-1">
            {loggedInUser || "User"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 cursor-pointer rounded-xl font-semibold transition duration-300 shadow-md"
        >
          Logout
        </button>

        <ToastContainer/>
      </div>
    </div>
  );
};
