import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";

function Signup() {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;

    if (!username || !email || !password) {
      return handleError("Please enter all fields");
    }

    try {
      const url =
        role === "admin"
          ? "http://localhost:8000/admin/signup"
          : "http://localhost:8000/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 2000);
      } else if (error) {
        const detail = error?.details?.[0]?.message;
        handleError(detail);
      } else {
        handleError(message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/image1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="w-full max-w-md relative bg-white/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/30 p-8">
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-200 mb-6 text-sm">
          Sign up to get started
        </p>

        <div className="flex justify-center mb-6">
          <div className="flex border border-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <button
              type="button"
              onClick={() => handleRoleChange("user")}
              className={`px-6 py-2 text-sm font-medium transition ${
                role === "user"
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
    : "bg-white/30 text-gray-200"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`px-6 py-2 text-sm font-medium transition ${
                role === "admin"
                 ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
    : "bg-white/30 text-gray-200"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            onChange={handleChange}
            type="text"
            value={signupInfo.username}
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={signupInfo.email}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={signupInfo.password}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Sign Up
          </button>
        </form>

       <p className="mt-8 text-center text-gray-200 text-sm space-x-2">
  <Link
    to="/FrontPage"
    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-pink-400 font-semibold 
               hover:bg-white/20 transition-all duration-300 shadow-md"
  >
    ⬅ Go Back
  </Link>
  
  <span className="text-gray-300">|</span>
  
  <span className="text-gray-300">Already have an account?</span>
  
  <Link
    to="/login"
    className="ml-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white 
               rounded-xl font-semibold shadow-md hover:opacity-90 transition-all duration-300"
  >
    Login
  </Link>
</p>

      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;