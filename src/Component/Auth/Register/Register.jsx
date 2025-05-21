'use client'

import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

function Register() {
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleOnChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };
    
    const handlePassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleRegister = async () => {
        try {
            console.log(user);
            const response = await axios.post('/api/auth/register', user);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
                    <p className="mt-2 text-gray-600">Create your account</p>
                </div>
                
                <div className="mt-8 space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaRegUser className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleOnChange}
                            required
                            className="w-full px-4 py-3 pl-10 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Full name"
                        />
                    </div>
                    
                    {/* Email Input */}
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
                    
                    {/* Password Input */}
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
                    
                    {/* Terms & Conditions Checkbox */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-gray-700">
                                I agree to the <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>
                            </label>
                        </div>
                    </div>
                    
                    {/* Register Button */}
                    <div>
                        <button
                            onClick={handleRegister}
                            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                        </button>
                    </div>
                    
                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;