"use client";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";

function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', user);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleOnChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdOutlineEmail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-3 pl-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email address"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SlLock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-3 pl-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
            />
            <div 
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={handlePassword}
            >
              {showPassword ? 
                <IoEyeOffSharp className="w-5 h-5 text-gray-500" /> : 
                <IoEyeOutline className="w-5 h-5 text-gray-500" />
              }
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              onClick={handleLogin}
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;