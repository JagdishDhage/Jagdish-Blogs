'use client'

import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
function Register() {
    const [user,setUser]=React.useState({
        name:'',
        email:'',
        password:'',
    })
    const [showPassword, setShowPassword]=React.useState(false);
    const handleOnChange= async(event)=>{
        setUser({...user,[event.target.name]:event.target.value})
    }
    const handlePasswor=()=>{
        setShowPassword(!showPassword)
    }
    const handleLogin= async ()=>{
        try{
            console.log(user)
            const response=await axios.post('/api/auth/register',user);
            console.log(response);
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div>
        <div className="">
              <div className="flex justify-center items-center flex-col shadow-2xl w-3/12 mx-auto p-10 border-2 gap-4 ">
                     <p className="text-2xl font-bold text-center">
                        Wellcome
                    </p>
                    <div className="flex justify-center items-center rounded border-2 m-0 p-1 w-full">
                   
                   <FaRegUser className="w-6 h-6" />
                   <input
                     type="text"
                     className="outline-none flex-1 px-2"
                     name="name"
                     placeholder="Enter the name"
                     onChange={handleOnChange}
                     value={user.name}
                   />
                 </div>
                <div className="flex justify-center items-center rounded border-2 m-0 p-1 w-full">
                   
                  <MdOutlineEmail className="w-6 h-6" />
                  <input
                    type="email"
                    className="outline-none flex-1 px-2"
                    name="email"
                    placeholder="Enter the Email"
                    onChange={handleOnChange}
                    value={user.email}
                  />
                </div>
        
                <div className="flex justify-center items-center border-2 p-1 w-full rounded">
                  <SlLock className="w-6 h-6"/>
                  <input
                    type={showPassword?"text":"password"}
                    className="outline-none flex-1 px-2"
                    name="password"
                    value={user.password}
                    placeholder="Enter the password"
                    onChange={handleOnChange}
                  />
                 <button type='button' className='' onClick={handlePasswor}>
                     {showPassword ?<IoEyeOffSharp/>:<IoEyeOutline/> }
                 </button>
                  
                </div>
                <button className="bg-blue-300 border p-2 rounded" onClick={handleLogin}>Login</button>
              </div>
            </div>
    </div>
  )
}

export default Register